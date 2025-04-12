"use client"

import type React from "react"

import { useState } from "react"
import { addRegistration } from "@/lib/firebase"
import { toast } from "@/components/toast"

interface BedRegistrationFormProps {
  onClose: () => void
}

export default function BedRegistrationForm({ onClose }: BedRegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    checkIn: "",
    checkOut: "",
    roomType: "",
    numberOfGuests: "1",
    specialRequests: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.fullName || !formData.checkIn || !formData.checkOut || !formData.roomType) {
      toast("Error", "Please fill in all required fields", "error")
      return
    }

    setIsSubmitting(true)

    try {
      await addRegistration("bed-registrations", {
        ...formData,
        timestamp: new Date().toISOString(),
      })

      toast("Success", "Your bed registration has been submitted")
      onClose()
    } catch (error) {
      console.error("Error submitting form:", error)
      toast("Error", "Failed to submit registration. Please try again.", "error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Bed Registration</h2>
          <p className="modal-description">Fill in the details to book your stay</p>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="modal-content">
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="checkIn">Check-in Date</label>
              <input
                type="date"
                id="checkIn"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="checkOut">Check-out Date</label>
              <input
                type="date"
                id="checkOut"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="roomType">Room Type</label>
              <select id="roomType" name="roomType" value={formData.roomType} onChange={handleChange} required>
                <option value="">Select room type</option>
                <option value="standard">Standard</option>
                <option value="deluxe">Deluxe</option>
                <option value="suite">Suite</option>
                <option value="presidential">Presidential Suite</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="numberOfGuests">Number of Guests</label>
              <select id="numberOfGuests" name="numberOfGuests" value={formData.numberOfGuests} onChange={handleChange}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5+</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="specialRequests">Special Requests (optional)</label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                placeholder="Any special requests or requirements"
              />
            </div>
          </form>
        </div>

        <div className="modal-footer">
          <button type="button" className="button button-outline" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="button button-primary" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  )
}
