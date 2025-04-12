"use client"

import { useState } from "react"
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
    <div className="container">
      <h1>Hotel Services Registration</h1>

      <div className="card-grid">
        {/* Bed Registration Card */}
        <div className="card" onClick={() => openModal("bed")}>
          <div className="card-header">
            <svg
              className="card-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 4v16"></path>
              <path d="M2 8h18a2 2 0 0 1 2 2v10"></path>
              <path d="M2 17h20"></path>
              <path d="M6 8v9"></path>
            </svg>
            <h2 className="card-title">Bed Registration</h2>
            <p className="card-subtitle">Book your stay with us</p>
          </div>
          <div className="card-content">
            <p>Register for a comfortable stay in our luxurious rooms</p>
          </div>
          <div className="card-footer">
            <p>Click to register</p>
          </div>
        </div>

        {/* Spa Registration Card */}
        <div className="card" onClick={() => openModal("spa")}>
          <div className="card-header">
            <svg
              className="card-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            <h2 className="card-title">Spa Registration</h2>
            <p className="card-subtitle">Relax and rejuvenate</p>
          </div>
          <div className="card-content">
            <p>Book a spa session for ultimate relaxation</p>
          </div>
          <div className="card-footer">
            <p>Click to register</p>
          </div>
        </div>

        {/* Dining Registration Card */}
        <div className="card" onClick={() => openModal("dining")}>
          <div className="card-header">
            <svg
              className="card-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
              <path d="M7 2v20"></path>
              <path d="M21 15V2"></path>
              <path d="M18 15V2"></path>
              <path d="M21 15a3 3 0 1 1-6 0"></path>
            </svg>
            <h2 className="card-title">Dining Registration</h2>
            <p className="card-subtitle">Reserve your table</p>
          </div>
          <div className="card-content">
            <p>Book a table at our exquisite restaurant</p>
          </div>
          <div className="card-footer">
            <p>Click to register</p>
          </div>
        </div>
      </div>

      {/* Registration Modals */}
      {activeModal === "bed" && <BedRegistrationForm onClose={closeModal} />}
      {activeModal === "spa" && <SpaRegistrationForm onClose={closeModal} />}
      {activeModal === "dining" && <DiningRegistrationForm onClose={closeModal} />}
    </div>
  )
}
