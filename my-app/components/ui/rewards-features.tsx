import { BadgePercent, Gift, LineChart, Sparkles, Trophy, Zap } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { JSX } from "react";


// Define the RewardFeature type
type RewardFeature = {
  title: string;
  description: string;
  icon: JSX.Element;
};

const features: RewardFeature[] = [
  {
    title: "AI-Powered Personalization",
    description:
      "Our system learns your preferences to offer tailored rewards and experiences that match your interests.",
    icon: <Sparkles className="h-10 w-10 text-primary" />,
  },
  {
    title: "Dynamic Reward Rates",
    description:
      "Earn more points based on your engagement level, with bonus multipliers for frequent stays and activities.",
    icon: <LineChart className="h-10 w-10 text-primary" />,
  },
  {
    title: "Instant Gratification",
    description: "Redeem points immediately for on-property benefits during your stay – no waiting required.",
    icon: <Zap className="h-10 w-10 text-primary" />,
  },
  {
    title: "Milestone Rewards",
    description: "Unlock special one-time rewards when you reach significant spending or stay milestones.",
    icon: <Trophy className="h-10 w-10 text-primary" />,
  },
  {
    title: "Exclusive Member Rates",
    description: "Access special pricing and offers available only to loyalty program members.",
    icon: <BadgePercent className="h-10 w-10 text-primary" />,
  },
  {
    title: "Surprise & Delight",
    description: "Receive unexpected perks and gifts based on your profile and special occasions.",
    icon: <Gift className="h-10 w-10 text-primary" />,
  },
]

export function RewardsFeatures(): JSX.Element {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {features.map((feature, index) => (
        <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
          <CardHeader className="pb-2">
            <div className="mb-2">{feature.icon}</div>
            <CardTitle>{feature.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base">{feature.description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
