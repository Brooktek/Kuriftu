"use client"

import { JSX, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { useAuth } from "../context/auth-provider"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"

interface NavigationSubItem {
  href: string
  label: string
}

interface NavigationItem {
  href: string
  label: string
  children?: NavigationSubItem[]
}

interface NavigationBarProps {
  logo?: string
  brandName?: string
  items?: NavigationItem[]
}

// Comprehensive navigation structure with all main sections
const defaultNavItems: NavigationItem[] = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "#",
    label: "Membership",
    children: [
      { href: "#tiers", label: "Membership Tiers" },
      { href: "/membership/join", label: "Join Now" },
      { href: "/membership/benefits", label: "Benefits" },
      { href: "/membership/faq", label: "FAQ" },
    ],
  },
  {
    href: "#",
    label: "Rewards",
    children: [
      { href: "/rewards/points", label: "Earning Points" },
      { href: "/rewards/redeem", label: "Redeem Rewards" },
      { href: "/rewards/special-offers", label: "Special Offers" },
      { href: "/rewards/partners", label: "Partner Programs" },
    ],
  },
  {
    href: "#",
    label: "Experiences",
    children: [
      { href: "/experiences/stays", label: "Stays" },
      { href: "/experiences/dining", label: "Dining" },
      { href: "/experiences/spa", label: "Spa & Wellness" },
      { href: "/experiences/adventures", label: "Adventures" },
    ],
  },
  {
    href: "#app",
    label: "Mobile App",
  },
  {
    href: "#",
    label: "Locations",
    children: [
      { href: "/locations/bishoftu", label: "Bishoftu" },
      { href: "/locations/bahirdar", label: "Bahir Dar" },
      { href: "/locations/lake-tana", label: "Lake Tana" },
      { href: "/locations/awash", label: "Awash Falls" },
    ],
  },
  {
    href: "/contact",
    label: "Contact",
  },
]

export function NavigationBar({
  logo = "/logo.svg",
  brandName = "Kuriftu Rewards",
  items = defaultNavItems,
}: NavigationBarProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false)
  const { user, loading } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo || "/placeholder.svg"} alt={brandName} width={32} height={32} />
          <span className="text-xl font-bold">{brandName}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          {items.map((item) =>
            item.children ? (
              <DropdownMenu key={item.label}>
                <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium hover:text-primary">
                  {item.label}
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-48">
                  {item.children.map((child) => (
                    <DropdownMenuItem key={child.href} asChild>
                      <Link href={child.href} className="w-full cursor-pointer">
                        {child.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link key={item.href} href={item.href} className="text-sm font-medium hover:text-primary">
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-4">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <span className="hidden md:inline">{user.displayName || user.email?.split('@')[0]}</span>
                <Avatar>
                  <AvatarImage src={user.photoURL || undefined} />
                  <AvatarFallback>
                    {user.displayName?.charAt(0) || user.email?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut(auth)}>
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Button variant="outline" className="hidden md:inline-flex">
              <Link href="/login">Log In</Link>
            </Button>
            <Button>
              <Link href="/signup">Join Now</Link>
            </Button>
          </>
        )}

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent   side="right" 
  className="w-[300px] sm:w-[400px] overflow-y-auto" 
  {...({} as any)} >
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
                <nav className="flex flex-col py-6">
                  <Accordion type="single" collapsible className="w-full">
                    {items.map((item, index) =>
                      item.children ? (
                        <AccordionItem key={item.label} value={`item-${index}`}>
                          <AccordionTrigger className="py-2 text-base font-medium hover:text-primary">
                            {item.label}
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="flex flex-col space-y-2 pl-4">
                              {item.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  className="py-1 text-sm hover:text-primary"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ) : (
                        <div key={item.href} className="py-2">
                          <Link
                            href={item.href}
                            className="text-base font-medium px-2 py-1 hover:text-primary"
                            onClick={() => setIsOpen(false)}
                          >
                            {item.label}
                          </Link>
                        </div>
                      ),
                    )}
                  </Accordion>
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
