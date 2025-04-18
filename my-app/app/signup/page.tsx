"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { auth, db } from "@/lib/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { Mail, Lock, User, Calendar, AlertCircle } from "lucide-react"

export default function LoginPage() {
    const router = useRouter()

    const [formData, setFormData] = useState({
        fullName: "",
        age: "",
        email: "",
        password: "",
    })

    const [errors, setErrors] = useState({
        fullName: "",
        age: "",
        email: "",
        password: "",
    })

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
            fullName: "",
            age: "",
            email: "",
            password: "",
        }

        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full name is required"
            valid = false
        }

        if (!formData.age.trim()) {
            newErrors.age = "Age is required"
            valid = false
        } else if (isNaN(Number(formData.age)) || Number(formData.age) <= 0) {
            newErrors.age = "Please enter a valid age"
            valid = false
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
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters"
            valid = false
        }

        setErrors(newErrors)
        return valid
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (validateForm()) {
            try {
                const { user } = await createUserWithEmailAndPassword(
                    auth,
                    formData.email,
                    formData.password
                )
                await setDoc(doc(db, "users", user.uid), {
                    fullName: formData.fullName,
                    age: formData.age,
                    email: formData.email,
                    createdAt: new Date().toISOString()
                })

                console.log("User registered and data saved!")

                // ✅ Redirect after successful sign up
                router.push("/")
                window.location.href = "/"
            } catch (error: any) {
                console.error("Firebase error:", error.message)
            }
        }
    }

    const handleGoogleLogin = () => {
        // Handle Google login
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
                                <Label htmlFor="fullName" className="text-gray-700">Full Name</Label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <User className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <Input
                                        id="fullName"
                                        name="fullName"
                                        placeholder="John Doe"
                                        className="pl-10 bg-white border-gray-300 text-gray-900"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors.fullName && (
                                    <p className="text-sm text-red-500 flex items-center gap-1">
                                        <AlertCircle className="h-3 w-3" />
                                        {errors.fullName}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="age" className="text-gray-700">Age</Label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <Calendar className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <Input
                                        id="age"
                                        name="age"
                                        type="number"
                                        placeholder="25"
                                        className="pl-10 bg-white border-gray-300 text-gray-900"
                                        value={formData.age}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors.age && (
                                    <p className="text-sm text-red-500 flex items-center gap-1">
                                        <AlertCircle className="h-3 w-3" />
                                        {errors.age}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-gray-700">Email</Label>
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
                                <Label htmlFor="password" className="text-gray-700">Password</Label>
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
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            <path fill="none" d="M1 1h22v22H1z" />
                        </svg>
                        Sign in with Google
                    </Button>
                </CardContent>
                <CardFooter className="flex justify-center bg-white">
                    <p className="text-sm text-gray-500">
                        Don't have an account?{" "}
                        <a href="/login" className="text-blue-600 hover:underline">
                            Sign up
                        </a>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}
