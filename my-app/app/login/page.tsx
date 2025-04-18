"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Mail, Lock, AlertCircle } from "lucide-react"
import { auth, signInWithEmailAndPassword } from "@/lib/firebase" // Import Firebase authentication methods
import { useRouter } from "next/navigation" // Move `useRouter` import here

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const [errors, setErrors] = useState({
        email: "",
        password: "",
    })

    const router = useRouter() // Initialize useRouter here

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const validateForm = () => {
        let valid = true
        const newErrors = {
            email: "",
            password: "",
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required"
            valid = false
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email"
            valid = false
        }

        if (!formData.password.trim()) {
            newErrors.password = "Password is required"
            valid = false
        }

        setErrors(newErrors)
        return valid
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (validateForm()) {
            try {
                // Attempt to log in with Firebase
                await signInWithEmailAndPassword(auth, formData.email, formData.password)
                console.log("Login successful")
                router.push("/") // Redirect after successful login
            } catch (error: any) {
                console.error("Login failed:", error.message)
                setErrors((prev) => ({
                    ...prev,
                    email: "Invalid email or password",
                }))
            }
        }
    }

    const handleGoogleLogin = () => {
        // Implement Google login (optional, if needed)
        console.log("Google login initiated")
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-white p-4">
            <Card className="w-full max-w-md bg-white text-gray-900 border-gray-200">
                <CardHeader className="space-y-1 bg-white">
                    <CardTitle className="text-2xl font-bold text-center text-gray-900">Login</CardTitle>
                    <CardDescription className="text-center text-gray-500">
                        Enter your details to sign in to your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="bg-white">
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-gray-700">
                                    Email
                                </Label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <Mail className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        className="pl-10 bg-white border-gray-300 text-gray-900"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-sm text-red-500 flex items-center gap-1">
                                        <AlertCircle className="h-3 w-3" />
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-gray-700">
                                    Password
                                </Label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <Lock className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        className="pl-10 bg-white border-gray-300 text-gray-900"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors.password && (
                                    <p className="text-sm text-red-500 flex items-center gap-1">
                                        <AlertCircle className="h-3 w-3" />
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <Label htmlFor="remember" className="text-sm text-gray-700">
                                        Remember me
                                    </Label>
                                </div>
                                <a href="#" className="text-sm text-blue-600 hover:underline">
                                    Forgot password?
                                </a>
                            </div>

                            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                                Sign In
                            </Button>
                        </div>
                    </form>

                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                            <Separator className="w-full bg-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        type="button"
                        className="w-full bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                        onClick={handleGoogleLogin}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 mr-2">
                            {/* Google icon SVG path */}
                        </svg>
                        Sign in with Google
                    </Button>
                </CardContent>
                <CardFooter className="flex justify-center bg-white">
                    <p className="text-sm text-gray-500">
                        Don't have an account?{" "}
                        <a href="/signup" className="text-blue-600 hover:underline">
                            Sign up
                        </a>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}
