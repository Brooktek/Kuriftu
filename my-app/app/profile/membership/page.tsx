"use client"

import { useEffect, useState } from "react"
import { BadgeCheck, Check, ChevronRight, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getUserMembership } from "@/lib/api"
import type { MembershipTier } from "@/types"

interface UserMembership {
  tier: MembershipTier
  points: number
  nextTier: MembershipTier | null
  pointsToNextTier: number | null
  memberSince: string
}

export default function MembershipPage(): JSX.Element {
  const [membership, setMembership] = useState<UserMembership | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [viewType, setViewType] = useState<"benefits" | "qualification">("benefits")

  useEffect(() => {
    async function loadData() {
      try {
        // In a real app, we would get the userId from authentication
        const userId = "user123"
        const membershipData = await getUserMembership(userId)
        setMembership(membershipData)
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

  if (!membership) {
    return <div className="flex items-center justify-center min-h-screen">Error loading data</div>
  }

  const progressPercentage = membership.nextTier
    ? Math.min(100, (membership.points / (membership.points + (membership.pointsToNextTier || 0))) * 100)
    : 100

  // All tiers for display
  const allTiers: MembershipTier[] = [
    {
      name: "Explorer",
      description: "Perfect for first-time and occasional guests",
      qualification: "0-2 stays per year",
      pointsMultiplier: "1x",
      features: [
        "Earn 10 points per $1 spent",
        "Member-exclusive rates",
        "Digital membership card",
        "Free Wi-Fi",
        "Late check-out upon availability",
      ],
      specialPerks: [],
      color: "bg-gradient-to-r from-slate-500 to-slate-600",
      textColor: "text-white",
    },
    {
      name: "Voyager",
      description: "For regular guests who choose Kuriftu",
      qualification: "3-5 stays per year",
      pointsMultiplier: "1.25x",
      features: [
        "Earn 12.5 points per $1 spent",
        "All Explorer benefits",
        "Room upgrade upon availability",
        "Early check-in upon availability",
        "Welcome amenity",
        "Dedicated reservations line",
      ],
      specialPerks: ["Complimentary breakfast for two"],
      color: "bg-gradient-to-r from-amber-500 to-amber-600",
      textColor: "text-white",
    },
    {
      name: "Adventurer",
      description: "For frequent guests who love Kuriftu",
      qualification: "6-9 stays per year",
      pointsMultiplier: "1.5x",
      features: [
        "Earn 15 points per $1 spent",
        "All Voyager benefits",
        "Guaranteed room upgrade",
        "Guaranteed late check-out (2pm)",
        "Spa treatment discount (15%)",
        "Dining discount (15%)",
      ],
      specialPerks: ["Annual free night certificate", "Exclusive seasonal offers"],
      color: "bg-gradient-to-r from-emerald-500 to-emerald-600",
      textColor: "text-white",
      featured: true,
    },
    {
      name: "Connoisseur",
      description: "Our highest tier for our most loyal guests",
      qualification: "10+ stays per year",
      pointsMultiplier: "2x",
      features: [
        "Earn 20 points per $1 spent",
        "All Adventurer benefits",
        "Guaranteed suite upgrade",
        "Guaranteed late check-out (4pm)",
        "Spa treatment discount (25%)",
        "Dining discount (25%)",
        "Airport transfers",
        "Personal concierge",
      ],
      specialPerks: [
        "Annual 2-night free stay",
        "Exclusive access to member events",
        "Personalized welcome amenities",
        "Priority access to new experiences",
      ],
      color: "bg-gradient-to-r from-purple-500 to-purple-600",
      textColor: "text-white",
    },
  ]

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Membership Status</h1>
          <p className="text-muted-foreground">Your current tier and benefits</p>
        </div>
        <Button variant="outline">Download Membership Card</Button>
      </div>

      {/* Current Tier Card */}
      <Card className={`${membership.tier.color} ${membership.tier.textColor} mb-8`}>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div>
              <div className="text-sm opacity-80">Current Tier</div>
              <div className="text-3xl font-bold mt-1">{membership.tier.name}</div>
              <div className="mt-1 opacity-90">
                Member since {new Date(membership.memberSince).toLocaleDateString()}
              </div>
            </div>
            <div className="flex flex-col items-start md:items-end">
              <div className="text-sm opacity-80">Available Points</div>
              <div className="text-3xl font-bold mt-1">{membership.points.toLocaleString()}</div>
              <div className="mt-1 opacity-90">Points Multiplier: {membership.tier.pointsMultiplier}</div>
            </div>
          </div>

          {membership.nextTier && (
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Progress to {membership.nextTier.name}</span>
                <span>{progressPercentage.toFixed(0)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-2 bg-white/20" indicatorClassName="bg-white" />
              <div className="text-sm mt-2 opacity-80">
                {membership.pointsToNextTier?.toLocaleString()} more points needed
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tier Benefits */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Your Tier Benefits</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Core Benefits</CardTitle>
              <CardDescription>Standard benefits for your tier</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {membership.tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <BadgeCheck className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Special Perks</CardTitle>
              <CardDescription>Exclusive benefits for {membership.tier.name} members</CardDescription>
            </CardHeader>
            <CardContent>
              {membership.tier.specialPerks.length > 0 ? (
                <ul className="space-y-2">
                  {membership.tier.specialPerks.map((perk, index) => (
                    <li key={index} className="flex items-start">
                      <Star className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5 fill-primary" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-muted-foreground">Upgrade to a higher tier to unlock special perks.</div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* All Membership Tiers */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Membership Tiers</h2>
          <Tabs
            defaultValue="benefits"
            className="w-auto"
            onValueChange={(v) => setViewType(v as "benefits" | "qualification")}
          >
            <TabsList>
              <TabsTrigger value="benefits">Benefits View</TabsTrigger>
              <TabsTrigger value="qualification">Qualification View</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {allTiers.map((tier) => (
            <Card
              key={tier.name}
              className={`relative overflow-hidden ${tier.featured ? "ring-2 ring-primary" : ""} ${tier.name === membership.tier.name ? "border-primary" : ""}`}
            >
              {tier.featured && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium">
                  Most Popular
                </div>
              )}
              {tier.name === membership.tier.name && (
                <div className="absolute top-0 left-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium">
                  Current Tier
                </div>
              )}
              <CardHeader className={`${tier.color} ${tier.textColor}`}>
                <CardTitle className="text-2xl">{tier.name}</CardTitle>
                <CardDescription className={`${tier.textColor} opacity-90`}>{tier.description}</CardDescription>
                {viewType === "qualification" && (
                  <div className="mt-2 text-sm font-medium">Qualification: {tier.qualification}</div>
                )}
                <div className="mt-4">
                  <div className="text-sm opacity-90">Points Multiplier</div>
                  <div className="text-3xl font-bold">{tier.pointsMultiplier}</div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-2">
                  {tier.features.slice(0, 5).map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                  {tier.features.length > 5 && (
                    <li className="text-sm text-primary">+{tier.features.length - 5} more benefits</li>
                  )}
                </ul>
                {tier.specialPerks.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-medium text-sm mb-2">Special Perks:</h4>
                    <ul className="space-y-2">
                      {tier.specialPerks.map((perk) => (
                        <li key={perk} className="flex items-start">
                          <div className="h-5 w-5 flex items-center justify-center text-primary mr-2 flex-shrink-0">
                            <Star className="h-4 w-4 fill-primary" />
                          </div>
                          <span className="text-sm">{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  variant={tier.name === membership.tier.name ? "secondary" : tier.featured ? "default" : "outline"}
                  className="w-full"
                  disabled={tier.name === membership.tier.name}
                >
                  {tier.name === membership.tier.name
                    ? "Current Tier"
                    : viewType === "benefits"
                      ? "View Details"
                      : "Learn How to Qualify"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* How to Earn Points */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">How to Earn Points</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Hotel Stays</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Earn points on every dollar spent on room rates and eligible hotel charges.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Room Rate</span>
                  <span className="font-medium">{membership.tier.pointsMultiplier} points per $1</span>
                </div>
                <div className="flex justify-between">
                  <span>Room Service</span>
                  <span className="font-medium">{membership.tier.pointsMultiplier} points per $1</span>
                </div>
                <div className="flex justify-between">
                  <span>Minibar</span>
                  <span className="font-medium">{membership.tier.pointsMultiplier} points per $1</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Book a Stay <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dining & Spa</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Earn points when dining at our restaurants or enjoying spa treatments.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Restaurant Dining</span>
                  <span className="font-medium">{membership.tier.pointsMultiplier} points per $1</span>
                </div>
                <div className="flex justify-between">
                  <span>Spa Treatments</span>
                  <span className="font-medium">{membership.tier.pointsMultiplier} points per $1</span>
                </div>
                <div className="flex justify-between">
                  <span>Wellness Activities</span>
                  <span className="font-medium">{membership.tier.pointsMultiplier} points per $1</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Dining & Spa <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Special Promotions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Earn bonus points through special promotions and partner activities.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Seasonal Promotions</span>
                  <span className="font-medium">Up to 3x points</span>
                </div>
                <div className="flex justify-between">
                  <span>Partner Activities</span>
                  <span className="font-medium">Varies by partner</span>
                </div>
                <div className="flex justify-between">
                  <span>Referral Bonus</span>
                  <span className="font-medium">5,000 points</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Current Promotions <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
