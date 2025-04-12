import type React from "react"
// Membership tier types
export interface MembershipTier {
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

// Rewards feature types
export interface RewardFeature {
  title: string
  description: string
  icon: React.ReactNode
}

// Experience types
export interface RedemptionOption {
  name: string
  points: string
  value: string
}

export interface Experience {
  id: string
  title: string
  description: string
  earnRate: string
  redemptionOptions: RedemptionOption[]
  image: string
}

// App feature types
export interface AppFeature {
  title: string
  description: string
  icon: React.ReactNode
}

// Testimonial types
export interface Testimonial {
  name: string
  tier: string
  location: string
  image: string
  quote: string
  rating: number
}
