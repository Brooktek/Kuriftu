"use client"

import { JSX, useState } from "react"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type MembershipTier = {
  name: string
  description: string
  qualification: string
  pointsMultiplier: string
  features: string[]
  specialPerks: string[]
  color: string
  textColor: string
  featured?: boolean
}

const tiers: MembershipTier[] = [
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

type ViewType = "benefits" | "qualification"

export function MembershipTiers(): JSX.Element {
  const [view, setView] = useState<ViewType>("benefits")

  return (
    <div className="space-y-8">
      <Tabs defaultValue="benefits" className="w-full" onValueChange={(v: string) => setView(v as ViewType)}>
        <div className="flex justify-center">
          <TabsList>
            <TabsTrigger value="benefits">Benefits View</TabsTrigger>
            <TabsTrigger value="qualification">Qualification View</TabsTrigger>
          </TabsList>
        </div>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tiers.map((tier) => (
          <Card key={tier.name} className={`relative overflow-hidden ${tier.featured ? "ring-2 ring-primary" : ""}`}>
            {tier.featured && (
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium">
                Most Popular
              </div>
            )}
            <CardHeader className={`${tier.color} ${tier.textColor}`}>
              <CardTitle className="text-2xl">{tier.name}</CardTitle>
              <CardDescription className={`${tier.textColor} opacity-90`}>{tier.description}</CardDescription>
              {view === "qualification" && (
                <div className="mt-2 text-sm font-medium">Qualification: {tier.qualification}</div>
              )}
              <div className="mt-4">
                <div className="text-sm opacity-90">Points Multiplier</div>
                <div className="text-3xl font-bold">{tier.pointsMultiplier}</div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-2">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              {tier.specialPerks.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-medium text-sm mb-2">Special Perks:</h4>
                  <ul className="space-y-2">
                    {tier.specialPerks.map((perk) => (
                      <li key={perk} className="flex items-start">
                        <div className="h-5 w-5 flex items-center justify-center text-primary mr-2 flex-shrink-0">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        </div>
                        <span className="text-sm">{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant={tier.featured ? "default" : "outline"} className="w-full">
                {view === "benefits" ? "Join This Tier" : "Learn More"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
