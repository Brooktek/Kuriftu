"use client"

import { useState } from "react"
import { Globe, Mail, Moon, Smartphone, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage(): JSX.Element {
  const [language, setLanguage] = useState<string>("en")
  const [theme, setTheme] = useState<string>("light")
  const [notifications, setNotifications] = useState<{
    email: boolean
    push: boolean
    sms: boolean
    promotions: boolean
    updates: boolean
    reminders: boolean
  }>({
    email: true,
    push: true,
    sms: false,
    promotions: true,
    updates: true,
    reminders: true,
  })

  const [activeTab, setActiveTab] = useState("account")

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-md mb-8">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        {/* Account Settings */}
        <TabsContent value="account">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" type="date" defaultValue="1985-06-15" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Address Information</CardTitle>
                <CardDescription>Update your address details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address1">Address Line 1</Label>
                  <Input id="address1" defaultValue="123 Main Street" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address2">Address Line 2</Label>
                  <Input id="address2" defaultValue="Apt 4B" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" defaultValue="New York" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State/Province</Label>
                    <Input id="state" defaultValue="NY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">Zip/Postal Code</Label>
                    <Input id="zip" defaultValue="10001" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select defaultValue="us">
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="et">Ethiopia</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>Change your password</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Update Password</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Notification Channels</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <Label htmlFor="emailNotifications" className="cursor-pointer">
                        Email Notifications
                      </Label>
                    </div>
                    <Switch
                      id="emailNotifications"
                      checked={notifications.email}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-5 w-5 text-muted-foreground" />
                      <Label htmlFor="pushNotifications" className="cursor-pointer">
                        Push Notifications
                      </Label>
                    </div>
                    <Switch
                      id="pushNotifications"
                      checked={notifications.push}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-5 w-5 text-muted-foreground" />
                      <Label htmlFor="smsNotifications" className="cursor-pointer">
                        SMS Notifications
                      </Label>
                    </div>
                    <Switch
                      id="smsNotifications"
                      checked={notifications.sms}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Notification Types</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="promotions" className="cursor-pointer">
                        Promotions and Offers
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive updates about special offers and promotions
                      </p>
                    </div>
                    <Switch
                      id="promotions"
                      checked={notifications.promotions}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, promotions: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="updates" className="cursor-pointer">
                        Account Updates
                      </Label>
                      <p className="text-sm text-muted-foreground">Receive updates about your account and membership</p>
                    </div>
                    <Switch
                      id="updates"
                      checked={notifications.updates}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, updates: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="reminders" className="cursor-pointer">
                        Booking Reminders
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive reminders about upcoming stays and reservations
                      </p>
                    </div>
                    <Switch
                      id="reminders"
                      checked={notifications.reminders}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, reminders: checked })}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Privacy Settings */}
        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Manage your privacy preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Data Sharing</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="analytics" className="cursor-pointer">
                        Analytics
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Allow us to collect anonymous usage data to improve our services
                      </p>
                    </div>
                    <Switch id="analytics" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="marketing" className="cursor-pointer">
                        Marketing
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Allow us to use your data for personalized marketing
                      </p>
                    </div>
                    <Switch id="marketing" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="thirdParty" className="cursor-pointer">
                        Third-Party Sharing
                      </Label>
                      <p className="text-sm text-muted-foreground">Allow us to share your data with trusted partners</p>
                    </div>
                    <Switch id="thirdParty" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Account Privacy</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="twoFactor" className="cursor-pointer">
                        Two-Factor Authentication
                      </Label>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch id="twoFactor" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="loginHistory" className="cursor-pointer">
                        Login History
                      </Label>
                      <p className="text-sm text-muted-foreground">View and manage your login history</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View History
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Data Management</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="cursor-pointer">Download Your Data</Label>
                      <p className="text-sm text-muted-foreground">Get a copy of all your personal data</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Request Data
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="cursor-pointer text-destructive">Delete Account</Label>
                      <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                    </div>
                    <Button variant="destructive" size="sm">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Privacy Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Preferences Settings */}
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Customize your experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Language</h3>
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="w-full max-w-xs">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="am">Amharic</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="ar">Arabic</SelectItem>
                      <SelectItem value="zh">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Theme</h3>
                <RadioGroup value={theme} onValueChange={setTheme} className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="light" />
                    <Label htmlFor="light" className="flex items-center gap-2 cursor-pointer">
                      <Sun className="h-5 w-5" /> Light
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dark" id="dark" />
                    <Label htmlFor="dark" className="flex items-center gap-2 cursor-pointer">
                      <Moon className="h-5 w-5" /> Dark
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="system" id="system" />
                    <Label htmlFor="system" className="flex items-center gap-2 cursor-pointer">
                      <div className="flex">
                        <Sun className="h-5 w-5" />
                        <Moon className="h-5 w-5 ml-1" />
                      </div>
                      System
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Currency</h3>
                <Select defaultValue="usd">
                  <SelectTrigger className="w-full max-w-xs">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD ($)</SelectItem>
                    <SelectItem value="eur">EUR (€)</SelectItem>
                    <SelectItem value="gbp">GBP (£)</SelectItem>
                    <SelectItem value="etb">ETB (Br)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Accessibility</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="reducedMotion" className="cursor-pointer">
                        Reduced Motion
                      </Label>
                      <p className="text-sm text-muted-foreground">Minimize animations throughout the interface</p>
                    </div>
                    <Switch id="reducedMotion" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="highContrast" className="cursor-pointer">
                        High Contrast
                      </Label>
                      <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
                    </div>
                    <Switch id="highContrast" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="largeText" className="cursor-pointer">
                        Larger Text
                      </Label>
                      <p className="text-sm text-muted-foreground">Increase text size throughout the interface</p>
                    </div>
                    <Switch id="largeText" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
