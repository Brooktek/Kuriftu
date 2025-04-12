"use client"

import Image from "next/image"
import { JSX, useState } from "react"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


// Define the Experience type
type Experience = {
  id: string;
  title: string;
  description: string;
  earnRate: string;
  redemptionOptions: {
    name: string;
    points: string;
    value: string;
  }[];
  image: string;
};

const experiences: Experience[] = [
  {
    id: "stays",
    title: "Stays",
    description: "Earn and redeem points on room bookings and upgrades",
    earnRate: "10 points per $1 spent on room rates",
    redemptionOptions: [
      { name: "Free Night Stay", points: "25,000", value: "$250+" },
      { name: "Room Upgrade", points: "10,000", value: "$100+" },
      { name: "Late Check-out", points: "5,000", value: "$50" },
    ],
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: "dining",
    title: "Dining",
    description: "Earn and redeem points at all Kuriftu restaurants and bars",
    earnRate: "10 points per $1 spent on food and beverages",
    redemptionOptions: [
      { name: "Complimentary Dinner for Two", points: "15,000", value: "$150" },
      { name: "Bottle of Premium Wine", points: "7,500", value: "$75" },
      { name: "Dessert Platter", points: "2,500", value: "$25" },
    ],
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: "spa",
    title: "Spa & Wellness",
    description: "Earn and redeem points on all spa treatments and wellness activities",
    earnRate: "10 points per $1 spent on spa services",
    redemptionOptions: [
      { name: "90-min Signature Massage", points: "12,000", value: "$120" },
      { name: "Facial Treatment", points: "8,000", value: "$80" },
      { name: "Wellness Class", points: "3,000", value: "$30" },
    ],
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: "adventures",
    title: "Adventures",
    description: "Earn and redeem points on excursions and adventure activities",
    earnRate: "10 points per $1 spent on adventure bookings",
    redemptionOptions: [
      { name: "Private Boat Tour", points: "20,000", value: "$200" },
      { name: "Guided Hiking Experience", points: "10,000", value: "$100" },
      { name: "Sunset Safari", points: "15,000", value: "$150" },
    ],
    image: "/placeholder.svg?height=600&width=800",
  },
]

export function ExperienceIntegration(): JSX.Element {
  const [activeTab, setActiveTab] = useState<string>("stays")

  return (
    <div className="space-y-8">
      <Tabs defaultValue="stays" className="w-full" onValueChange={setActiveTab}>
        <div className="flex justify-center">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full max-w-2xl">
            {experiences.map((exp) => (
              <TabsTrigger key={exp.id} value={exp.id}>
                {exp.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {experiences.map((experience) => (
          <TabsContent key={experience.id} value={experience.id} className="mt-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
                <Image
                  src={experience.image || "/placeholder.svg"}
                  alt={experience.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold">{experience.title}</h3>
                  <p className="mt-2 text-muted-foreground">{experience.description}</p>
                </div>

                <div>
                  <h4 className="font-medium">Earning Rate</h4>
                  <p className="mt-1 text-sm">{experience.earnRate}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Popular Redemption Options</h4>
                  <div className="space-y-3">
                    {experience.redemptionOptions.map((option, index) => (
                      <Card key={index} className="overflow-hidden">
                        <CardContent className="p-4 flex justify-between items-center">
                          <div>
                            <div className="font-medium">{option.name}</div>
                            <div className="text-sm text-muted-foreground">Value: {option.value}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-primary">{option.points}</div>
                            <div className="text-xs text-muted-foreground">points</div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <Button className="w-full sm:w-auto">
                  Explore {experience.title} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
