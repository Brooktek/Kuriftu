"use client"

import { useEffect, useState } from "react"

export type ToastType = "success" | "error"

interface Toast {
  id: string
  title: string
  message: string
  type: ToastType
}

let toastCounter = 0
const toasts: Toast[] = []
let listeners: ((toasts: Toast[]) => void)[] = []

export function toast(title: string, message: string, type: ToastType = "success") {
  const id = String(++toastCounter)
  const newToast = { id, title, message, type }

  toasts.push(newToast)
  listeners.forEach((listener) => listener([...toasts]))

  setTimeout(() => {
    const index = toasts.findIndex((t) => t.id === id)
    if (index !== -1) {
      toasts.splice(index, 1)
      listeners.forEach((listener) => listener([...toasts]))
    }
  }, 5000)
}

export function ToastContainer() {
  const [visibleToasts, setVisibleToasts] = useState<Toast[]>([])

  useEffect(() => {
    const listener = (updatedToasts: Toast[]) => {
      setVisibleToasts(updatedToasts)
    }

    listeners.push(listener)
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  }, [])

  return (
    <div className="toast-container">
      {visibleToasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type}`}>
          <div className="toast-content">
            <h4 className="toast-title">{toast.title}</h4>
            <p className="toast-message">{toast.message}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
