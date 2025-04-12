"use client"

import { useState } from "react"
import Image from "next/image"
import { CreditCard, Edit, Plus, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PaymentMethod {
  id: string
  type: "credit" | "debit"
  cardBrand: string
  lastFour: string
  expiryMonth: string
  expiryYear: string
  cardholderName: string
  isDefault: boolean
  billingAddress?: {
    line1: string
    line2?: string
    city: string
    state: string
    postalCode: string
    country: string
  }
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "card-1",
    type: "credit",
    cardBrand: "visa",
    lastFour: "4242",
    expiryMonth: "12",
    expiryYear: "2025",
    cardholderName: "John Doe",
    isDefault: true,
    billingAddress: {
      line1: "123 Main St",
      city: "Anytown",
      state: "CA",
      postalCode: "12345",
      country: "United States",
    },
  },
  {
    id: "card-2",
    type: "debit",
    cardBrand: "mastercard",
    lastFour: "5678",
    expiryMonth: "09",
    expiryYear: "2024",
    cardholderName: "John Doe",
    isDefault: false,
    billingAddress: {
      line1: "123 Main St",
      city: "Anytown",
      state: "CA",
      postalCode: "12345",
      country: "United States",
    },
  },
]

interface Transaction {
  id: string
  date: string
  description: string
  amount: number
  status: "completed" | "pending" | "failed"
  paymentMethod: string
}

const transactions: Transaction[] = [
  {
    id: "tx-1",
    date: "2023-10-15",
    description: "Kuriftu Resort Bishoftu - Room Charge",
    amount: 750,
    status: "completed",
    paymentMethod: "Visa •••• 4242",
  },
  {
    id: "tx-2",
    date: "2023-09-22",
    description: "Kuriftu Spa - Massage Treatment",
    amount: 120,
    status: "completed",
    paymentMethod: "Mastercard •••• 5678",
  },
  {
    id: "tx-3",
    date: "2023-08-30",
    description: "Kuriftu Restaurant - Dinner",
    amount: 85,
    status: "completed",
    paymentMethod: "Visa •••• 4242",
  },
  {
    id: "tx-4",
    date: "2023-07-15",
    description: "Kuriftu Resort Bahir Dar - Deposit",
    amount: 200,
    status: "completed",
    paymentMethod: "Visa •••• 4242",
  },
]

export default function PaymentMethodsPage(): JSX.Element {
  const [methods, setMethods] = useState<PaymentMethod[]>(paymentMethods)
  const [addCardOpen, setAddCardOpen] = useState<boolean>(false)
  const [editingCard, setEditingCard] = useState<PaymentMethod | null>(null)

  const handleSetDefault = (id: string) => {
    setMethods(
      methods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      })),
    )
  }

  const handleDeleteCard = (id: string) => {
    setMethods(methods.filter((method) => method.id !== id))
  }

  const handleEditCard = (card: PaymentMethod) => {
    setEditingCard(card)
  }

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Payment Methods</h1>
          <p className="text-muted-foreground">Manage your payment methods and view transaction history</p>
        </div>
        <Dialog open={addCardOpen} onOpenChange={setAddCardOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Payment Method
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Payment Method</DialogTitle>
              <DialogDescription>Enter your card details to add a new payment method.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="expiryMonth">Month</Label>
                  <Select>
                    <SelectTrigger id="expiryMonth">
                      <SelectValue placeholder="MM" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => {
                        const month = (i + 1).toString().padStart(2, "0")
                        return (
                          <SelectItem key={month} value={month}>
                            {month}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="expiryYear">Year</Label>
                  <Select>
                    <SelectTrigger id="expiryYear">
                      <SelectValue placeholder="YY" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => {
                        const year = (new Date().getFullYear() + i).toString().slice(-2)
                        return (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cardholderName">Cardholder Name</Label>
                <Input id="cardholderName" placeholder="John Doe" />
              </div>
              <div className="grid gap-2">
                <Label>Card Type</Label>
                <RadioGroup defaultValue="credit" className="flex">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="credit" id="credit" />
                    <Label htmlFor="credit">Credit</Label>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <RadioGroupItem value="debit" id="debit" />
                    <Label htmlFor="debit">Debit</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="defaultCard" className="rounded border-gray-300" />
                  <Label htmlFor="defaultCard">Set as default payment method</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddCardOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setAddCardOpen(false)}>Add Card</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={!!editingCard} onOpenChange={(open) => !open && setEditingCard(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Payment Method</DialogTitle>
              <DialogDescription>Update your card details.</DialogDescription>
            </DialogHeader>
            {editingCard && (
              <div className="grid gap-4 py-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 relative">
                    <Image
                      src={`/placeholder.svg?height=32&width=48`}
                      alt={editingCard.cardBrand}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <div className="font-medium">
                      {editingCard.cardBrand.charAt(0).toUpperCase() + editingCard.cardBrand.slice(1)} ••••{" "}
                      {editingCard.lastFour}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Expires {editingCard.expiryMonth}/{editingCard.expiryYear}
                    </div>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="edit-cardholderName">Cardholder Name</Label>
                  <Input id="edit-cardholderName" defaultValue={editingCard.cardholderName} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-expiryMonth">Month</Label>
                    <Select defaultValue={editingCard.expiryMonth}>
                      <SelectTrigger id="edit-expiryMonth">
                        <SelectValue placeholder="MM" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => {
                          const month = (i + 1).toString().padStart(2, "0")
                          return (
                            <SelectItem key={month} value={month}>
                              {month}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-expiryYear">Year</Label>
                    <Select defaultValue={editingCard.expiryYear}>
                      <SelectTrigger id="edit-expiryYear">
                        <SelectValue placeholder="YY" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 10 }, (_, i) => {
                          const year = (new Date().getFullYear() + i).toString().slice(-2)
                          return (
                            <SelectItem key={year} value={year}>
                              {year}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label>Billing Address</Label>
                  <Input
                    placeholder="Address Line 1"
                    defaultValue={editingCard.billingAddress?.line1 || ""}
                    className="mb-2"
                  />
                  <Input
                    placeholder="Address Line 2 (Optional)"
                    defaultValue={editingCard.billingAddress?.line2 || ""}
                    className="mb-2"
                  />
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <Input placeholder="City" defaultValue={editingCard.billingAddress?.city || ""} />
                    <Input placeholder="State/Province" defaultValue={editingCard.billingAddress?.state || ""} />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Input placeholder="Postal Code" defaultValue={editingCard.billingAddress?.postalCode || ""} />
                    <Select defaultValue={editingCard.billingAddress?.country || "US"}>
                      <SelectTrigger>
                        <SelectValue placeholder="Country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="ET">Ethiopia</SelectItem>
                        <SelectItem value="GB">United Kingdom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="editDefaultCard"
                      className="rounded border-gray-300"
                      defaultChecked={editingCard.isDefault}
                    />
                    <Label htmlFor="editDefaultCard">Set as default payment method</Label>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingCard(null)}>
                Cancel
              </Button>
              <Button onClick={() => setEditingCard(null)}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="cards" className="w-full">
        <TabsList className="grid grid-cols-2 w-full max-w-md mb-6">
          <TabsTrigger value="cards">Payment Methods</TabsTrigger>
          <TabsTrigger value="transactions">Transaction History</TabsTrigger>
        </TabsList>

        <TabsContent value="cards">
          <div className="grid gap-6">
            {methods.length > 0 ? (
              methods.map((method) => (
                <Card key={method.id} className={method.isDefault ? "border-primary" : ""}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-8 relative">
                          <Image
                            src={`/placeholder.svg?height=32&width=48`}
                            alt={method.cardBrand}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <div className="font-medium">
                              {method.cardBrand.charAt(0).toUpperCase() + method.cardBrand.slice(1)} ••••{" "}
                              {method.lastFour}
                            </div>
                            {method.isDefault && (
                              <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {method.type.charAt(0).toUpperCase() + method.type.slice(1)} Card • Expires{" "}
                            {method.expiryMonth}/{method.expiryYear}
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">{method.cardholderName}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-4 md:mt-0">
                        <Button variant="outline" size="sm" className="h-8" onClick={() => handleEditCard(method)}>
                          <Edit className="h-3.5 w-3.5 mr-1" />
                          Edit
                        </Button>
                        {!method.isDefault && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8"
                              onClick={() => handleSetDefault(method.id)}
                            >
                              Set Default
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 text-destructive hover:bg-destructive/10"
                              onClick={() => handleDeleteCard(method.id)}
                            >
                              <Trash className="h-3.5 w-3.5 mr-1" />
                              Remove
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <CreditCard className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No payment methods</h3>
                  <p className="text-muted-foreground mb-4">You haven't added any payment methods yet.</p>
                  <Button onClick={() => setAddCardOpen(true)}>Add Payment Method</Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your payment history with Kuriftu Resorts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {transactions.length > 0 ? (
                  transactions.map((transaction) => (
                    <div key={transaction.id} className="py-4 flex justify-between items-center">
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-full ${
                            transaction.status === "completed"
                              ? "bg-green-100"
                              : transaction.status === "pending"
                                ? "bg-amber-100"
                                : "bg-red-100"
                          }`}
                        >
                          <CreditCard
                            className={`h-5 w-5 ${
                              transaction.status === "completed"
                                ? "text-green-600"
                                : transaction.status === "pending"
                                  ? "text-amber-600"
                                  : "text-red-600"
                            }`}
                          />
                        </div>
                        <div>
                          <div className="font-medium">{transaction.description}</div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(transaction.date).toLocaleDateString()} • {transaction.paymentMethod}
                          </div>
                        </div>
                      </div>
                      <div className="font-bold">
                        ${transaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-muted-foreground">No transactions found.</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-6">
              <Button variant="outline">View All Transactions</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
