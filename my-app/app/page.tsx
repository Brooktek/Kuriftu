"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BedIcon, Utensils, SpadeIcon as Spa } from "lucide-react"
import BedRegistrationForm from "@/components/bed-registration-form"
import SpaRegistrationForm from "@/components/spa-registration-form"
import DiningRegistrationForm from "@/components/dining-registration-form"

export default function RegistrationPage() {
  const [activeModal, setActiveModal] = useState<string | null>(null)

  const openModal = (modalType: string) => {
    setActiveModal(modalType)
  }

  const closeModal = () => {
    setActiveModal(null)
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-10">Hotel Services Registration</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Bed Registration Card */}
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => openModal("bed")}>
          <CardHeader className="flex flex-col items-center">
            <BedIcon className="h-12 w-12 mb-2 text-primary" />
            <CardTitle>Bed Registration</CardTitle>
            <CardDescription>Book your stay with us</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">Register for a comfortable stay in our luxurious rooms</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">Click to register</p>
          </CardFooter>
        </Card>

        {/* Spa Registration Card */}
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => openModal("spa")}>
          <CardHeader className="flex flex-col items-center">
            <Spa className="h-12 w-12 mb-2 text-primary" />
            <CardTitle>Spa Registration</CardTitle>
            <CardDescription>Relax and rejuvenate</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">Book a spa session for ultimate relaxation</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">Click to register</p>
          </CardFooter>
        </Card>

        {/* Dining Registration Card */}
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => openModal("dining")}>
          <CardHeader className="flex flex-col items-center">
            <Utensils className="h-12 w-12 mb-2 text-primary" />
            <CardTitle>Dining Registration</CardTitle>
            <CardDescription>Reserve your table</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">Book a table at our exquisite restaurant</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">Click to register</p>
          </CardFooter>
        </Card>
      </div>

      {/* Registration Modals */}
      {activeModal === "bed" && <BedRegistrationForm onClose={closeModal} />}
      {activeModal === "spa" && <SpaRegistrationForm onClose={closeModal} />}
      {activeModal === "dining" && <DiningRegistrationForm onClose={closeModal} />}
    </div>
  )
}
