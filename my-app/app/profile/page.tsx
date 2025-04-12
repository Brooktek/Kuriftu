"use client"

import { JSX, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, BadgeCheck, Calendar, CreditCard, Gift, Hotel, MapPin, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getUserMembership, getPersonalizedRecommendations, getPointHistory } from "@/lib/api"
import React from 'react';



interface MembershipTier {
  name: string
  pointsMultiplier: string
  color?: string
  textColor?: string
  features: string[]
  specialPerks: string[]
}

interface UserMembership {
  tier: MembershipTier
  points: number
  nextTier: MembershipTier | null
  pointsToNextTier: number | null
  memberSince: string
}

interface PointTransaction {
  id: string
  date: string
  description: string
  points: number
  type: "earn" | "redeem"
}

const userId = "user123"; // Define userId
const recommendationsData = await getPersonalizedRecommendations(userId).then(data => ({
  ...data,
  experiences: data.experiences.map(exp => ({
    ...exp,
    redemptionOptions: exp.redemptionOptions.map(opt => ({
      ...opt,
      points: Number(opt.points) // Convert string points to number
    }))
  }))
}));
const offers: Array<{
  id: string;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
}> = recommendationsData.offers;

export default function ProfilePage(): JSX.Element {
  const [membership, setMembership] = useState<UserMembership | null>(null)
  interface Recommendation {
    experiences: Array<{
      id: string
      image: string
      title: string
      description: string
      redemptionOptions: Array<{
        points: number
        value: string
      }>
    }>
    offers: Array<{
      id: string
      title: string
      description: string
      discount: string
      validUntil: string
    }>
  }

  const [recommendations, setRecommendations] = useState<Recommendation | null>(null)

  interface Experience {
    id: string
    image: string
    title: string
    description: string
    redemptionOptions: Array<{
      points: number
      value: string
    }>
  }
  const [pointHistory, setPointHistory] = useState<PointTransaction[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function loadData() {
      try {
        // In a real app, we would get the userId from authentication
        const userId = "user123"
        const membershipData = await getUserMembership(userId)
        const recommendationsData = await getPersonalizedRecommendations(userId)
        const pointHistoryData = await getPointHistory(userId)

        setMembership(membershipData)
        setRecommendations({
          ...recommendationsData,
          experiences: recommendationsData.experiences.map((experience) => ({
            ...experience,
            redemptionOptions: experience.redemptionOptions.map((option) => ({
              points: Number(option.points),
              value: option.value,
            })),
          })),
        })
        setPointHistory(pointHistoryData)
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!membership || !recommendations) {
    return <div className="flex items-center justify-center min-h-screen">Error loading data</div>
  }

  const progressPercentage = membership.nextTier
    ? Math.min(100, (membership.points / (membership.points + (membership.pointsToNextTier || 0))) * 100)
    : 100

  return (
    <div className="container py-8 px-4 md:px-6 flex flex-col items-center">
      {/* Profile Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          <div className="relative">
            <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-primary/20">
              <Image
                src="/placeholder.svg?height=128&width=128"
                alt="Profile"
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-primary text-white text-xs font-medium px-2 py-1 rounded-full">
              {membership.tier.name}
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold">Welcome back, John</h1>
            <p className="text-muted-foreground mt-1">
              Member since {new Date(membership.memberSince).toLocaleDateString()}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-4 flex flex-col items-center md:items-start">
                  <div className="text-sm text-muted-foreground">Available Points</div>
                  <div className="text-3xl font-bold text-primary">{membership.points.toLocaleString()}</div>
                  <Link href="/profile/history" className="text-xs text-primary mt-1 flex items-center">
                    View history <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-4 flex flex-col items-center md:items-start">
                  <div className="text-sm text-muted-foreground">Points Multiplier</div>
                  <div className="text-3xl font-bold text-primary">{membership.tier.pointsMultiplier}</div>
                  <div className="text-xs text-muted-foreground mt-1">Based on your tier</div>
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-4 flex flex-col items-center md:items-start">
                  <div className="text-sm text-muted-foreground">Next Stay</div>
                  <div className="text-xl font-bold text-primary">May 15-18, 2023</div>
                  <div className="text-xs text-muted-foreground mt-1">Kuriftu Resort Bishoftu</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Tier Progress */}
        {membership.nextTier && (
          <Card className="mt-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
                <div>
                  <h3 className="font-medium">Progress to {membership.nextTier.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {membership.pointsToNextTier?.toLocaleString()} more points needed
                  </p>
                </div>
                <Link href="/profile/membership">
                  <Button variant="outline" size="sm">
                    View Benefits
                  </Button>
                </Link>
              </div>

              <div className="relative pt-4">
                <Progress value={progressPercentage} className="h-3" />
                <div className="absolute top-0 left-0 text-xs text-muted-foreground">{membership.tier.name}</div>
                <div className="absolute top-0 right-0 text-xs text-muted-foreground">{membership.nextTier.name}</div>
                <div
                  className="absolute top-4 text-xs font-medium text-primary"
                  style={{ left: `${progressPercentage}%`, transform: "translateX(-50%)" }}
                >
                  {progressPercentage.toFixed(0)}%
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Link href="/profile/bookings">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-4 flex flex-col items-center text-center h-full justify-center">
              <Hotel className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-medium">Book a Stay</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Earn {membership.tier.pointsMultiplier} points per $1
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/profile/history">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-4 flex flex-col items-center text-center h-full justify-center">
              <Gift className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-medium">Redeem Rewards</h3>
              <p className="text-xs text-muted-foreground mt-1">Use your {membership.points.toLocaleString()} points</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/profile/bookings">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-4 flex flex-col items-center text-center h-full justify-center">
              <Calendar className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-medium">My Bookings</h3>
              <p className="text-xs text-muted-foreground mt-1">View or modify reservations</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/profile/payment">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-4 flex flex-col items-center text-center h-full justify-center">
              <CreditCard className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-medium">Payment Methods</h3>
              <p className="text-xs text-muted-foreground mt-1">Manage your cards</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="recommendations" className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-md mx-auto mb-6">
          <TabsTrigger value="recommendations">For You</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="benefits">Benefits</TabsTrigger>
          <TabsTrigger value="stays">Stays</TabsTrigger>
        </TabsList>

        {/* Recommendations Tab */}
        <TabsContent value="recommendations" className="space-y-6">
          <h2 className="text-2xl font-bold">Personalized For You</h2>

          <div className="grid md:grid-cols-2 gap-6">
  {recommendations.experiences.map((experience: Experience) => (
    <Card key={experience.id} className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48">
        <Image
          src={experience.image || "/placeholder.svg"}
          alt={typeof experience.title === "string" ? experience.title : "Experience"}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <div className="flex items-center gap-1 mb-1">
            <MapPin className="h-4 w-4" />
            <span className="text-xs">Kuriftu Bishoftu</span>
          </div>
          <h3 className="text-xl font-bold">{experience.title}</h3>
        </div>
      </div>
      <CardContent className="p-4">
        <p className="text-muted-foreground">{experience.description}</p>
        <div className="flex justify-between items-center mt-4">
          <div>
            <div className="text-sm font-medium">From {experience.redemptionOptions[0].points} points</div>
            <div className="text-xs text-muted-foreground">
              Value: {typeof experience.redemptionOptions[0].value === "string" || typeof experience.redemptionOptions[0].value === "number" ? experience.redemptionOptions[0].value : 'N/A'}
            </div>
          </div>
          <Button size="sm">View Details</Button>
        </div>
      </CardContent>
    </Card>
  ))}
</div>


          <h2 className="text-2xl font-bold mt-8">Special Offers</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {recommendations.offers.map((offer: { id: Key | null | undefined; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; description: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; discount: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; validUntil: string | number | Date }) => (
              <Card key={offer.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{offer.title}</CardTitle>
                  <CardDescription>{offer.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                    <div className="flex justify-between items-center">
                      <div className="text-2xl font-bold text-primary">{offer.discount}</div>
                      <div className="text-xs text-muted-foreground">
                        Valid until {new Date(offer.validUntil).toLocaleDateString()}
                      </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" variant="outline">
                      Redeem Offer
                    </Button>
                </CardFooter>
              </Card>
            ))}
            <Card className="border-dashed hover:border-primary/50 transition-colors">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full text-center">
                <Gift className="h-8 w-8 text-muted-foreground mb-2" />
                <h3 className="font-medium">More Offers Available</h3>
                <p className="text-sm text-muted-foreground mt-1">View all special offers and promotions</p>
                <Button variant="ghost" className="mt-4">
                  View All Offers
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Recent Activity</h2>
            <Link href="/profile/history">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {pointHistory.map((transaction) => (
                  <div key={transaction.id} className="p-4 flex justify-between items-center">
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-full ${transaction.type === "earn" ? "bg-green-100" : "bg-amber-100"}`}
                      >
                        {transaction.type === "earn" ? (
                          <BadgeCheck className="h-5 w-5 text-green-600" />
                        ) : (
                          <Gift className="h-5 w-5 text-amber-600" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{transaction.description}</div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(transaction.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className={`font-bold ${transaction.type === "earn" ? "text-green-600" : "text-amber-600"}`}>
                      {transaction.type === "earn" ? "+" : "-"}
                      {Math.abs(transaction.points).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Points Summary</CardTitle>
                <CardDescription>Your points activity this year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <div className="text-sm">Total Points Earned</div>
                    <div className="font-bold text-green-600">+12,500</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-sm">Total Points Redeemed</div>
                    <div className="font-bold text-amber-600">-5,750</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-sm">Expiring Points (Next 90 days)</div>
                    <div className="font-bold text-red-600">2,000</div>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex justify-between">
                      <div className="font-medium">Current Balance</div>
                      <div className="font-bold">{membership.points.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Reservations</CardTitle>
                <CardDescription>Your next stays with Kuriftu</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <div className="bg-primary/10 p-2 rounded-md">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Kuriftu Resort Bishoftu</div>
                      <div className="text-sm text-muted-foreground">May 15-18, 2023 • 3 nights</div>
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" variant="outline">
                          Modify
                        </Button>
                        <Button size="sm" variant="outline">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="bg-primary/10 p-2 rounded-md">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Kuriftu Resort Bahir Dar</div>
                      <div className="text-sm text-muted-foreground">July 10-15, 2023 • 5 nights</div>
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" variant="outline">
                          Modify
                        </Button>
                        <Button size="sm" variant="outline">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Benefits Tab */}
        <TabsContent value="benefits" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Your {membership.tier.name} Benefits</h2>
            {membership.nextTier && (
              <Link href="/profile/membership">
                <Button variant="outline" size="sm">
                  View Next Tier
                </Button>
              </Link>
            )}
          </div>

          <Card className={`${membership.tier.color} ${membership.tier.textColor} overflow-hidden`}>
            <div className="relative">
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                {membership.tier.name}
              </div>
              <CardContent className="p-6 pt-16">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Tier Benefits</h3>
                    <ul className="space-y-2 opacity-90">
                      {membership.tier.features.slice(0, 5).map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <BadgeCheck className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                      {membership.tier.features.length > 5 && (
                        <li className="flex items-center">
                          <Button variant="link" className="text-white p-0 h-auto">
                            View all {membership.tier.features.length} benefits
                          </Button>
                        </li>
                      )}
                    </ul>
                  </div>

                  {membership.tier.specialPerks.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold mb-2">Special Perks</h3>
                      <ul className="space-y-2 opacity-90">
                        {membership.tier.specialPerks.map((perk, index) => (
                          <li key={index} className="flex items-start">
                            <Star className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5 fill-current" />
                            <span>{perk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </div>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Hotel className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Stay Benefits</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="text-sm flex items-start">
                    <BadgeCheck className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Earn {membership.tier.pointsMultiplier} points per $1 spent</span>
                  </li>
                  <li className="text-sm flex items-start">
                    <BadgeCheck className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Room upgrade upon availability</span>
                  </li>
                  <li className="text-sm flex items-start">
                    <BadgeCheck className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Early check-in & late check-out</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Exclusive Perks</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="text-sm flex items-start">
                    <Star className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5 fill-primary" />
                    <span>Welcome amenity on arrival</span>
                  </li>
                  <li className="text-sm flex items-start">
                    <Star className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5 fill-primary" />
                    <span>Member-only events and offers</span>
                  </li>
                  <li className="text-sm flex items-start">
                    <Star className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5 fill-primary" />
                    <span>Dedicated reservations line</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <BadgeCheck className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Tier Status</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium">Current Tier</div>
                    <div className="text-lg font-bold text-primary">{membership.tier.name}</div>
                  </div>
                  {membership.nextTier && (
                    <div>
                      <div className="text-sm font-medium">Next Tier</div>
                      <div className="text-lg">{membership.nextTier.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {membership.pointsToNextTier?.toLocaleString()} points needed
                      </div>
                    </div>
                  )}
                  <Link href="/profile/membership">
                    <Button className="w-full" variant="outline" size="sm">
                      View All Tiers
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Stays Tab */}
        <TabsContent value="stays" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Your Stays</h2>
            <Button>Book a Stay</Button>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Stays</CardTitle>
                <CardDescription>Your confirmed reservations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-4 items-start">
                    <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src="/placeholder.svg?height=128&width=128"
                        alt="Kuriftu Resort"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div>
                          <h3 className="text-lg font-bold">Kuriftu Resort Bishoftu</h3>
                          <div className="text-sm text-muted-foreground">May 15-18, 2023 • 3 nights</div>
                        </div>
                        <div className="text-sm font-medium text-primary">Confirmation #: KR12345</div>
                      </div>
                      <div className="mt-2 text-sm">
                        <div>Lake View Suite • 2 Adults</div>
                        <div className="text-muted-foreground">Includes: Breakfast, Airport Transfer</div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-4">
                        <Button size="sm">Manage Reservation</Button>
                        <Button size="sm" variant="outline">
                          Add Activities
                        </Button>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 items-start">
                    <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src="/placeholder.svg?height=128&width=128"
                        alt="Kuriftu Resort"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div>
                          <h3 className="text-lg font-bold">Kuriftu Resort Bahir Dar</h3>
                          <div className="text-sm text-muted-foreground">July 10-15, 2023 • 5 nights</div>
                        </div>
                        <div className="text-sm font-medium text-primary">Confirmation #: KR12789</div>
                      </div>
                      <div className="mt-2 text-sm">
                        <div>Presidential Suite • 2 Adults, 1 Child</div>
                        <div className="text-muted-foreground">Includes: All-Inclusive Package</div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-4">
                        <Button size="sm">Manage Reservation</Button>
                        <Button size="sm" variant="outline">
                          Add Activities
                        </Button>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Past Stays</CardTitle>
                <CardDescription>Your stay history with Kuriftu</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-4 items-start">
                    <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-md overflow-hidden flex-shrink-0 grayscale">
                      <Image
                        src="/placeholder.svg?height=128&width=128"
                        alt="Kuriftu Resort"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div>
                          <h3 className="text-lg font-bold">Kuriftu Resort Bishoftu</h3>
                          <div className="text-sm text-muted-foreground">January 5-8, 2023 • 3 nights</div>
                        </div>
                        <div className="text-sm font-medium text-muted-foreground">Earned: 3,500 points</div>
                      </div>
                      <div className="mt-2 text-sm">
                        <div>Deluxe Room • 2 Adults</div>
                        <div className="text-muted-foreground">Included: Breakfast</div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-4">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          Book Again
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 items-start">
                    <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-md overflow-hidden flex-shrink-0 grayscale">
                      <Image
                        src="/placeholder.svg?height=128&width=128"
                        alt="Kuriftu Resort"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div>
                          <h3 className="text-lg font-bold">Kuriftu Resort Lake Tana</h3>
                          <div className="text-sm text-muted-foreground">November 12-15, 2022 • 3 nights</div>
                        </div>
                        <div className="text-sm font-medium text-muted-foreground">Earned: 4,200 points</div>
                      </div>
                      <div className="mt-2 text-sm">
                        <div>Lake View Suite • 2 Adults</div>
                        <div className="text-muted-foreground">Included: Half Board</div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-4">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          Book Again
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <Button variant="outline">View All Past Stays</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
