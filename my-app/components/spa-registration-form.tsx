"use client"

import type React from "react"

import { useState } from "react"
import { addRegistration } from "@/lib/firebase"
import { toast } from "@/components/toast"

interface SpaRegistrationFormProps {
  onClose: () => void
}

export default function SpaRegistrationForm({ onClose }: SpaRegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    date: "",
    treatment: "",
    time: "",
    specialRequests: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.fullName || !formData.date || !formData.treatment || !formData.time) {
      toast("Error", "Please fill in all required fields", "error")
      return
    }

    setIsSubmitting(true)

    try {
      await addRegistration("spa-registrations", {
        ...formData,
        timestamp: new Date().toISOString(),
      })

      toast("Success", "Your spa registration has been submitted")
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
          <h2 className="modal-title">Spa Registration</h2>
          <p className="modal-description">Book your spa treatment</p>
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
              <label htmlFor="treatment">Treatment Type</label>
              <select id="treatment" name="treatment" value={formData.treatment} onChange={handleChange} required>
                <option value="">Select treatment</option>
                <option value="massage">Massage</option>
                <option value="facial">Facial</option>
                <option value="body-wrap">Body Wrap</option>
                <option value="manicure">Manicure/Pedicure</option>
                <option value="package">Spa Package</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="time">Preferred Time</label>
              <select id="time" name="time" value={formData.time} onChange={handleChange} required>
                <option value="">Select time</option>
                <option value="9:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="13:00">1:00 PM</option>
                <option value="14:00">2:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="16:00">4:00 PM</option>
                <option value="17:00">5:00 PM</option>
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
