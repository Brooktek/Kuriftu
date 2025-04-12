"use client"

import { JSX, useState } from "react"
import Image from "next/image"
import { Calendar, Filter, Hotel, MapPin, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"

interface Booking {
  id: string
  hotel: string
  location: string
  checkIn: string
  checkOut: string
  roomType: string
  guests: string
  status: "upcoming" | "past" | "cancelled"
  confirmationNumber: string
  image: string
  price?: string
  pointsEarned?: number
}

const bookings: Booking[] = [
  {
    id: "booking-1",
    hotel: "Kuriftu Resort Bishoftu",
    location: "Bishoftu, Ethiopia",
    checkIn: "2023-05-15",
    checkOut: "2023-05-18",
    roomType: "Lake View Suite",
    guests: "2 Adults",
    status: "upcoming",
    confirmationNumber: "KR12345",
    image: "/placeholder.svg?height=128&width=128",
    price: "$750",
  },
  {
    id: "booking-2",
    hotel: "Kuriftu Resort Bahir Dar",
    location: "Bahir Dar, Ethiopia",
    checkIn: "2023-07-10",
    checkOut: "2023-07-15",
    roomType: "Presidential Suite",
    guests: "2 Adults, 1 Child",
    status: "upcoming",
    confirmationNumber: "KR12789",
    image: "/placeholder.svg?height=128&width=128",
    price: "$1,200",
  },
  {
    id: "booking-3",
    hotel: "Kuriftu Resort Bishoftu",
    location: "Bishoftu, Ethiopia",
    checkIn: "2023-01-05",
    checkOut: "2023-01-08",
    roomType: "Deluxe Room",
    guests: "2 Adults",
    status: "past",
    confirmationNumber: "KR10987",
    image: "/placeholder.svg?height=128&width=128",
    pointsEarned: 3500,
  },
  {
    id: "booking-4",
    hotel: "Kuriftu Resort Lake Tana",
    location: "Lake Tana, Ethiopia",
    checkIn: "2022-11-12",
    checkOut: "2022-11-15",
    roomType: "Lake View Suite",
    guests: "2 Adults",
    status: "past",
    confirmationNumber: "KR10567",
    image: "/placeholder.svg?height=128&width=128",
    pointsEarned: 4200,
  },
  {
    id: "booking-5",
    hotel: "Kuriftu Resort Awash Falls",
    location: "Awash, Ethiopia",
    checkIn: "2022-09-20",
    checkOut: "2022-09-25",
    roomType: "Waterfall View Room",
    guests: "2 Adults",
    status: "cancelled",
    confirmationNumber: "KR09876",
    image: "/placeholder.svg?height=128&width=128",
  },
]

export default function BookingsPage(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterLocation, setFilterLocation] = useState<string>("all")

  // Filter bookings based on search, status, and location
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.hotel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.confirmationNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || booking.status === filterStatus
    const matchesLocation = filterLocation === "all" || booking.location.includes(filterLocation)

    return matchesSearch && matchesStatus && matchesLocation
  })

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Bookings</h1>
          <p className="text-muted-foreground">Manage your reservations and view booking history</p>
        </div>
        <Button>Book a New Stay</Button>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by hotel or confirmation #"
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="past">Past</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterLocation} onValueChange={setFilterLocation}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <SelectValue placeholder="Filter by location" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="Bishoftu">Bishoftu</SelectItem>
                <SelectItem value="Bahir Dar">Bahir Dar</SelectItem>
                <SelectItem value="Lake Tana">Lake Tana</SelectItem>
                <SelectItem value="Awash">Awash</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Stays</CardTitle>
              <CardDescription>Your confirmed reservations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {filteredBookings.filter((b) => b.status === "upcoming").length > 0 ? (
                  filteredBookings
                    .filter((b) => b.status === "upcoming")
                    .map((booking) => (
                      <div
                        key={booking.id}
                        className="flex flex-col md:flex-row gap-4 items-start border-b pb-6 last:border-0 last:pb-0"
                      >
                        <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={booking.image || "/placeholder.svg"}
                            alt={booking.hotel}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                            <div>
                              <h3 className="text-lg font-bold">{booking.hotel}</h3>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <MapPin className="h-3 w-3 mr-1" />
                                {booking.location}
                              </div>
                            </div>
                            <div className="text-sm font-medium text-primary">
                              Confirmation #: {booking.confirmationNumber}
                            </div>
                          </div>
                          <div className="mt-2 text-sm">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                              {new Date(booking.checkIn).toLocaleDateString()} -{" "}
                              {new Date(booking.checkOut).toLocaleDateString()}
                              <span className="mx-2">•</span>
                              {booking.roomType}
                              <span className="mx-2">•</span>
                              {booking.guests}
                            </div>
                            {booking.price && <div className="text-muted-foreground mt-1">Total: {booking.price}</div>}
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
                    ))
                ) : (
                  <div className="py-8 text-center">
                    <Hotel className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No upcoming bookings</h3>
                    <p className="text-muted-foreground mb-4">
                      You don't have any upcoming stays with Kuriftu Resorts.
                    </p>
                    <Button>Book a Stay</Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="past">
          <Card>
            <CardHeader>
              <CardTitle>Past Stays</CardTitle>
              <CardDescription>Your stay history with Kuriftu</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {filteredBookings.filter((b) => b.status === "past").length > 0 ? (
                  filteredBookings
                    .filter((b) => b.status === "past")
                    .map((booking) => (
                      <div
                        key={booking.id}
                        className="flex flex-col md:flex-row gap-4 items-start border-b pb-6 last:border-0 last:pb-0"
                      >
                        <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-md overflow-hidden flex-shrink-0 grayscale">
                          <Image
                            src={booking.image || "/placeholder.svg"}
                            alt={booking.hotel}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                            <div>
                              <h3 className="text-lg font-bold">{booking.hotel}</h3>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <MapPin className="h-3 w-3 mr-1" />
                                {booking.location}
                              </div>
                            </div>
                            {booking.pointsEarned && (
                              <div className="text-sm font-medium text-green-600">
                                Earned: {booking.pointsEarned.toLocaleString()} points
                              </div>
                            )}
                          </div>
                          <div className="mt-2 text-sm">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                              {new Date(booking.checkIn).toLocaleDateString()} -{" "}
                              {new Date(booking.checkOut).toLocaleDateString()}
                              <span className="mx-2">•</span>
                              {booking.roomType}
                              <span className="mx-2">•</span>
                              {booking.guests}
                            </div>
                            <div className="text-muted-foreground mt-1">
                              Confirmation #: {booking.confirmationNumber}
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-4">
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                            <Button size="sm" variant="outline">
                              Book Again
                            </Button>
                            <Button size="sm" variant="outline">
                              Write Review
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-muted-foreground">No past bookings found matching your filters.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cancelled">
          <Card>
            <CardHeader>
              <CardTitle>Cancelled Bookings</CardTitle>
              <CardDescription>Your cancelled reservations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {filteredBookings.filter((b) => b.status === "cancelled").length > 0 ? (
                  filteredBookings
                    .filter((b) => b.status === "cancelled")
                    .map((booking) => (
                      <div
                        key={booking.id}
                        className="flex flex-col md:flex-row gap-4 items-start border-b pb-6 last:border-0 last:pb-0"
                      >
                        <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-md overflow-hidden flex-shrink-0 grayscale opacity-70">
                          <Image
                            src={booking.image || "/placeholder.svg"}
                            alt={booking.hotel}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                            <div>
                              <h3 className="text-lg font-bold">{booking.hotel}</h3>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <MapPin className="h-3 w-3 mr-1" />
                                {booking.location}
                              </div>
                            </div>
                            <div className="text-sm font-medium text-muted-foreground">Cancelled</div>
                          </div>
                          <div className="mt-2 text-sm">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                              {new Date(booking.checkIn).toLocaleDateString()} -{" "}
                              {new Date(booking.checkOut).toLocaleDateString()}
                              <span className="mx-2">•</span>
                              {booking.roomType}
                              <span className="mx-2">•</span>
                              {booking.guests}
                            </div>
                            <div className="text-muted-foreground mt-1">
                              Confirmation #: {booking.confirmationNumber}
                            </div>
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
                    ))
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-muted-foreground">No cancelled bookings found matching your filters.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Book a New Stay</CardTitle>
            <CardDescription>Find your next Kuriftu experience</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Location</label>
                <Select defaultValue="bishoftu">
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bishoftu">Kuriftu Resort Bishoftu</SelectItem>
                    <SelectItem value="bahirdar">Kuriftu Resort Bahir Dar</SelectItem>
                    <SelectItem value="laketana">Kuriftu Resort Lake Tana</SelectItem>
                    <SelectItem value="awash">Kuriftu Resort Awash Falls</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Dates</label>
                <DatePickerWithRange className="w-full" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Guests</label>
                <Select defaultValue="2adults">
                  <SelectTrigger>
                    <SelectValue placeholder="Select guests" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1adult">1 Adult</SelectItem>
                    <SelectItem value="2adults">2 Adults</SelectItem>
                    <SelectItem value="2adults1child">2 Adults, 1 Child</SelectItem>
                    <SelectItem value="2adults2children">2 Adults, 2 Children</SelectItem>
                    <SelectItem value="more">More Options</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button className="mt-6 w-full md:w-auto">Search Availability</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
