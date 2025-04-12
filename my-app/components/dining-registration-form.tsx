"use client"

import type React from "react"

import { useState } from "react"
import { addRegistration } from "@/lib/firebase"
import { toast } from "@/components/toast"

interface DiningRegistrationFormProps {
  onClose: () => void
}

export default function DiningRegistrationForm({ onClose }: DiningRegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    date: "",
    time: "",
    numberOfGuests: "2",
    specialRequests: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.fullName || !formData.date || !formData.time) {
      toast("Error", "Please fill in all required fields", "error")
      return
    }

    setIsSubmitting(true)

    try {
      await addRegistration("dining-registrations", {
        ...formData,
        timestamp: new Date().toISOString(),
      })

      toast("Success", "Your dining reservation has been submitted")
      onClose()
    } catch (error) {
      console.error("Error submitting form:", error)
      toast("Error", "Failed to submit reservation. Please try again.", "error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Dining Reservation</h2>
          <p className="modal-description">Book a table at our restaurant</p>
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
              <label htmlFor="date">Date</label>
              <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="time">Preferred Time</label>
              <select id="time" name="time" value={formData.time} onChange={handleChange} required>
                <option value="">Select time</option>
                <option value="18:00">6:00 PM</option>
                <option value="18:30">6:30 PM</option>
                <option value="19:00">7:00 PM</option>
                <option value="19:30">7:30 PM</option>
                <option value="20:00">8:00 PM</option>
                <option value="20:30">8:30 PM</option>
                <option value="21:00">9:00 PM</option>
                <option value="21:30">9:30 PM</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="numberOfGuests">Number of Guests</label>
              <select id="numberOfGuests" name="numberOfGuests" value={formData.numberOfGuests} onChange={handleChange}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9+</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="specialRequests">Special Requests (optional)</label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                placeholder="Dietary restrictions, special occasions, etc."
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
