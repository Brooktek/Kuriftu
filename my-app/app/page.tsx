import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { NavigationBar } from "@/components/ui/navigation-bar"
import { MembershipTiers } from "@/components/ui/membership-tiers"
import { RewardsFeatures } from "@/components/ui/rewards-features"
import { ExperienceIntegration } from "@/components/ui/experience-integration"
import { MobileAppShowcase } from "@/components/ui/mobile-app-showcase"
import { TestimonialCarousel } from "@/components/ui/testimonial-carousel"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <NavigationBar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="relative h-[70vh] w-full">
            <Image
              src="/placeholder.svg?height=1080&width=1920"
              alt="Kuriftu Resort view"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="container">
              <div className="max-w-xl text-white">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Reimagined Loyalty. Extraordinary Rewards.
                </h1>
                <p className="mt-6 text-lg">
                  Introducing the new Kuriftu Rewards program, where your loyalty unlocks personalized experiences and
                  exclusive benefits tailored just for you.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                    Join Now
                  </Button>
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                    Explore Benefits
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Benefits */}
        <section id="benefits" className="py-20 bg-muted">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">A Loyalty Program That Truly Rewards</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Our AI-powered rewards system learns your preferences to deliver personalized experiences and benefits
                that matter most to you.
              </p>
            </div>

            <RewardsFeatures />
          </div>
        </section>

        {/* Membership Tiers */}
        <section id="tiers" className="py-20">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Membership Tiers Designed For You</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                From your first stay to your fiftieth, our tiered membership program ensures you're recognized and
                rewarded at every level.
              </p>
            </div>

            <MembershipTiers />
          </div>
        </section>

        {/* Experience Integration */}
        <section id="experiences" className="py-20 bg-muted">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Integrated Experiences, Seamless Rewards
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Earn and redeem points across all Kuriftu experiences – from luxurious spa treatments to thrilling
                adventures and exquisite dining.
              </p>
            </div>

            <ExperienceIntegration />
          </div>
        </section>

        {/* Direct Booking Benefits */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Book Direct, Benefit More</h2>
                <p className="mt-4 text-lg opacity-90">
                  Members who book directly with Kuriftu enjoy exclusive benefits unavailable through third-party
                  platforms.
                </p>
                <ul className="mt-8 space-y-4">
                  {[
                    "Earn 50% more points on direct bookings",
                    "Exclusive member rates – guaranteed lowest price",
                    "Complimentary room upgrades when available",
                    "Early check-in and late check-out privileges",
                    "No booking fees or hidden charges",
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-start">
                      <ChevronRight className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Button className="mt-8 bg-white text-primary hover:bg-gray-100">Book Your Stay</Button>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=800&width=600"
                  alt="Kuriftu Resort room"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mobile App Showcase */}
        <section id="app" className="py-20">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Your Rewards, Always at Hand</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                The Kuriftu Rewards app puts the power of our loyalty program in your pocket, with instant access to
                your points, personalized offers, and seamless booking.
              </p>
            </div>

            <MobileAppShowcase />
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-muted">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What Our Members Say</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Hear from guests who have experienced the benefits of our enhanced loyalty program.
              </p>
            </div>

            <TestimonialCarousel />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary/5">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to Elevate Your Kuriftu Experience?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Join Kuriftu Rewards today and start earning points toward unforgettable experiences and exclusive
                benefits.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Button size="lg">Join Now</Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted">
        <div className="container py-12">
          <div className="grid gap-8 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <Image src="/logo.svg" alt="Kuriftu Rewards" width={24} height={24} />
                <span className="text-lg font-bold">Kuriftu Rewards</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                The premier loyalty program for Kuriftu Resorts & Spa guests.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Program</h3>
              <ul className="mt-2 space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Membership Tiers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Earning Points
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Redeeming Rewards
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Support</h3>
              <ul className="mt-2 space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Download the App</h3>
              <p className="mt-2 text-sm text-muted-foreground">Get the Kuriftu Rewards app for iOS and Android.</p>
              <div className="mt-4 flex gap-2">
                <Link href="#">
                  <Image src="/placeholder.svg?height=40&width=120" alt="App Store" width={120} height={40} />
                </Link>
                <Link href="#">
                  <Image src="/placeholder.svg?height=40&width=120" alt="Google Play" width={120} height={40} />
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t pt-6 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Kuriftu Resorts & Spa. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
