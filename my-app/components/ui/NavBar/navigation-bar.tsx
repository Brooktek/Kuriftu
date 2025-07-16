"use client"

import { useState } from 'react'
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface NavigationItem {
  href: string
  label: string
}

interface NavigationBarProps {
  logo?: string
  brandName?: string
  items?: NavigationItem[]
}

export function NavigationBar({
  logo = "/logo.svg",
  brandName = "Kuriftu Rewards",
  items = [
    { href: "#benefits", label: "Benefits" },
    { href: "#tiers", label: "Membership Tiers" },
    { href: "#experiences", label: "Experiences" },
    { href: "#app", label: "Mobile App" },
  ],
}: NavigationBarProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo || "/placeholder.svg"} alt={brandName} width={32} height={32} />
          <span className="text-xl font-bold">{brandName}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium hover:text-primary">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="outline" className="hidden md:inline-flex">
            Log In
          </Button>
          <Button>Join Now</Button>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between border-b py-4">
                  <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                    <Image src={logo || "/placeholder.svg"} alt={brandName} width={24} height={24} />
                    <span className="font-bold">{brandName}</span>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>
                <nav className="flex flex-col gap-4 py-6">
                  {items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-base font-medium px-2 py-1 hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto flex flex-col gap-2 border-t py-6">
                  <Button variant="outline" className="w-full">
                    Log In
                  </Button>
                  <Button className="w-full">Join Now</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
