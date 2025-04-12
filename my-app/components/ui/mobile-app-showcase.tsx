import Image from "next/image"
import { BadgeCheck, Bell, CreditCard, Gift, MapPin, QrCode, Smartphone, Sparkles } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { JSX } from "react";


// Define the AppFeature interface
interface AppFeature {
  title: string;
  description: string;
  icon: JSX.Element;
}

const appFeatures: AppFeature[] = [
  {
    title: "Digital Membership Card",
    description: "Access your membership details and QR code for easy check-in and point redemption.",
    icon: <QrCode className="h-8 w-8 text-primary" />,
  },
  {
    title: "Real-time Points Tracking",
    description: "Monitor your points balance and see detailed history of earnings and redemptions.",
    icon: <CreditCard className="h-8 w-8 text-primary" />,
  },
  {
    title: "Personalized Offers",
    description: "Receive AI-curated offers based on your preferences and past stays.",
    icon: <Sparkles className="h-8 w-8 text-primary" />,
  },
  {
    title: "Instant Notifications",
    description: "Get alerts about new rewards, point milestones, and exclusive time-sensitive offers.",
    icon: <Bell className="h-8 w-8 text-primary" />,
  },
  {
    title: "One-Tap Booking",
    description: "Book your next stay directly through the app with member-exclusive rates.",
    icon: <Smartphone className="h-8 w-8 text-primary" />,
  },
  {
    title: "Location-Based Experiences",
    description: "Discover nearby activities and experiences that earn and redeem points.",
    icon: <MapPin className="h-8 w-8 text-primary" />,
  },
  {
    title: "Reward Redemption",
    description: "Browse and redeem rewards instantly, from room upgrades to spa treatments.",
    icon: <Gift className="h-8 w-8 text-primary" />,
  },
  {
    title: "Tier Progress Tracking",
    description: "Monitor your progress toward the next membership tier with visual indicators.",
    icon: <BadgeCheck className="h-8 w-8 text-primary" />,
  },
]

export function MobileAppShowcase(): JSX.Element {
  return (
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div className="relative h-[600px] flex justify-center">
        <div className="absolute w-[280px] h-[570px] bg-black rounded-[36px] p-3 shadow-xl">
          <div className="relative w-full h-full rounded-[28px] overflow-hidden">
            <Image
              src="/placeholder.svg?height=1200&width=600"
              alt="Kuriftu Rewards App"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {appFeatures.map((feature, index) => (
            <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center gap-2">
                  {feature.icon}
                  <h3 className="font-medium">{feature.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
