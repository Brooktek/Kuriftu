

// Simulated API functions for the loyalty program
// In a real application, these would connect to a backend service

/**
 * Defines the MembershipTier type
 */
export type MembershipTier = {
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

/**
 * Fetches user membership data
 */
export async function getUserMembership(userId: string): Promise<{
  tier: MembershipTier
  points: number
  nextTier: MembershipTier | null
  pointsToNextTier: number | null
  memberSince: string
}> {
  // This would be a real API call in production
  return {
    tier: {
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
    points: 15750,
    nextTier: {
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
    pointsToNextTier: 10000,
    memberSince: "2022-06-15",
  }
}

/**
 * Defines the Experience type
 */
export type Experience = {
  id: string
  title: string
  description: string
  earnRate: string
  redemptionOptions: Array<{ name: string; points: string; value: string }>
  image: string
}

/**
 * Fetches personalized recommendations for a user
 */
export async function getPersonalizedRecommendations(userId: string): Promise<{
  experiences: Experience[]
  offers: Array<{
    id: string
    title: string
    description: string
    discount: string
    validUntil: string
  }>
}> {
  // This would be a real API call in production
  return {
    experiences: [
      {
        id: "spa-1",
        title: "Relaxation Massage",
        description: "Based on your previous bookings, we think you'll love our signature massage",
        earnRate: "10 points per $1 spent on spa services",
        redemptionOptions: [{ name: "90-min Signature Massage", points: "12,000", value: "$120" }],
        image: "/placeholder.svg?height=600&width=800",
      },
      {
        id: "dining-2",
        title: "Sunset Dinner",
        description: "Enjoy a romantic dinner with lake views",
        earnRate: "10 points per $1 spent on food and beverages",
        redemptionOptions: [{ name: "Complimentary Dinner for Two", points: "15,000", value: "$150" }],
        image: "/placeholder.svg?height=600&width=800",
      },
    ],
    offers: [
      {
        id: "offer-1",
        title: "Weekend Getaway",
        description: "20% off your next weekend stay",
        discount: "20%",
        validUntil: "2023-12-31",
      },
      {
        id: "offer-2",
        title: "Spa Credit",
        description: "$50 spa credit with your next booking",
        discount: "$50",
        validUntil: "2023-11-30",
      },
    ],
  }
}

/**
 * Simulates booking a stay with the loyalty program
 */
export async function bookStay(data: {
  userId: string
  checkIn: string
  checkOut: string
  roomType: string
  guests: number
  usePoints: boolean
}): Promise<{
  bookingId: string
  pointsEarned: number
  totalCost: number
  upgrades: string[]
}> {
  // This would be a real API call in production
  return {
    bookingId: "BK" + Math.floor(Math.random() * 1000000),
    pointsEarned: 5000,
    totalCost: 500,
    upgrades: ["Late checkout", "Welcome amenity"],
  }
}

/**
 * Fetches user point history
 */
export async function getPointHistory(userId: string): Promise<
  Array<{
    id: string
    date: string
    description: string
    points: number
    type: "earn" | "redeem"
  }>
> {
  // This would be a real API call in production
  return [
    {
      id: "tx-1",
      date: "2023-10-15",
      description: "Stay at Kuriftu Resort Bishoftu",
      points: 5000,
      type: "earn",
    },
    {
      id: "tx-2",
      date: "2023-09-22",
      description: "Spa Treatment",
      points: 1200,
      type: "earn",
    },
    {
      id: "tx-3",
      date: "2023-08-30",
      description: "Room Upgrade Redemption",
      points: -10000,
      type: "redeem",
    },
  ]
}
