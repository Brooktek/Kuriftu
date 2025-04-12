"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { JSX } from "react/jsx-runtime"

// Define the Testimonial type
type Testimonial = {
  name: string
  tier: string
  location: string
  image: string
  quote: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah J.",
    tier: "Adventurer",
    location: "United States",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "The personalized recommendations from the Kuriftu Rewards program have completely transformed my stays. I received a surprise spa treatment on my birthday that was exactly what I needed!",
    rating: 5,
  },
  {
    name: "Michael T.",
    tier: "Connoisseur",
    location: "United Kingdom",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "As a frequent business traveler, the seamless experience of the rewards program makes a huge difference. The app makes it easy to track my points and redeem them for experiences my family can enjoy when they join me.",
    rating: 5,
  },
  {
    name: "Ayana B.",
    tier: "Voyager",
    location: "Ethiopia",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "I love how the points integrate across all experiences. I earned enough points from my dining and spa visits to upgrade to a suite on my next stay. The value is incredible!",
    rating: 5,
  },
  {
    name: "David L.",
    tier: "Adventurer",
    location: "Canada",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "The direct booking benefits alone make the membership worthwhile. I saved over $200 on my last stay, plus got a complimentary airport transfer that made arrival so much smoother.",
    rating: 5,
  },
]

export function TestimonialCarousel(): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const nextTestimonial = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <div className="relative max-w-4xl mx-auto">
      <Card className="border-2">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-shrink-0">
              <div className="relative w-24 h-24 rounded-full overflow-hidden">
                <Image
                  src={currentTestimonial.image || "/placeholder.svg"}
                  alt={currentTestimonial.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex justify-center md:justify-start mb-2">
                {Array(currentTestimonial.rating)
                  .fill(null)
                  .map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
              </div>
              <p className="italic mb-4">"{currentTestimonial.quote}"</p>
              <div>
                <div className="font-semibold">{currentTestimonial.name}</div>
                <div className="text-sm text-muted-foreground">
                  {currentTestimonial.tier} Member • {currentTestimonial.location}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center mt-6 gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={prevTestimonial}
          className="rounded-full"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex gap-1 items-center">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full ${index === currentIndex ? "bg-primary" : "bg-muted-foreground/30"}`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={nextTestimonial}
          className="rounded-full"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
