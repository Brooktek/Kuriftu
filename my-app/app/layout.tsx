import type React from "react"
import "./styles.css"
import { ToastContainer } from "@/components/toast"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <ToastContainer />
      </body>
    </html>
  )
}
