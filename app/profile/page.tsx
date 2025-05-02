"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { UserIcon, CreditCardIcon } from "lucide-react"

export default function ProfilePage() {
  const [volume, setVolume] = useState(80)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Profile Settings</h2>
        <div className="flex items-center space-x-2">
          <Button>Save Changes</Button>
        </div>
      </div>

      <Tabs defaultValue="account" className="space-y-4">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your account information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="h-20 w-20 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                  <UserIcon className="h-10 w-10 text-muted-foreground" />
                </div>
                <div>
                  <Button variant="outline" size="sm">
                    Change Avatar
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue="john.doe@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue="johndoe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+1 (555) 123-4567" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your password.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Update Password</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Music Preferences</CardTitle>
              <CardDescription>Customize your sleep music experience.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="music-style">Preferred Music Style</Label>
                <Select defaultValue="ambient">
                  <SelectTrigger>
                    <SelectValue placeholder="Select music style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ambient">Ambient</SelectItem>
                    <SelectItem value="nature">Nature Sounds</SelectItem>
                    <SelectItem value="classical">Classical</SelectItem>
                    <SelectItem value="meditation">Meditation</SelectItem>
                    <SelectItem value="white-noise">White Noise</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="volume">Default Volume</Label>
                  <span className="text-sm text-muted-foreground">{volume}%</span>
                </div>
                <Slider
                  id="volume"
                  min={0}
                  max={100}
                  step={1}
                  defaultValue={[volume]}
                  onValueChange={(value) => setVolume(value[0])}
                  className="w-full"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-play">Auto-play at Bedtime</Label>
                  <p className="text-sm text-muted-foreground">Automatically play music at your scheduled bedtime</p>
                </div>
                <Switch id="auto-play" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="fade-out">Fade Out</Label>
                  <p className="text-sm text-muted-foreground">Gradually reduce volume until music stops</p>
                </div>
                <Switch id="fade-out" defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fade-duration">Fade Out Duration</Label>
                <Select defaultValue="30">
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                    <SelectItem value="90">90 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sleep Schedule</CardTitle>
              <CardDescription>Set your typical sleep schedule to optimize music generation.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="bedtime">Typical Bedtime</Label>
                  <Select defaultValue="22:30">
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="21:00">9:00 PM</SelectItem>
                      <SelectItem value="21:30">9:30 PM</SelectItem>
                      <SelectItem value="22:00">10:00 PM</SelectItem>
                      <SelectItem value="22:30">10:30 PM</SelectItem>
                      <SelectItem value="23:00">11:00 PM</SelectItem>
                      <SelectItem value="23:30">11:30 PM</SelectItem>
                      <SelectItem value="00:00">12:00 AM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="wake-time">Typical Wake Time</Label>
                  <Select defaultValue="06:30">
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="05:00">5:00 AM</SelectItem>
                      <SelectItem value="05:30">5:30 AM</SelectItem>
                      <SelectItem value="06:00">6:00 AM</SelectItem>
                      <SelectItem value="06:30">6:30 AM</SelectItem>
                      <SelectItem value="07:00">7:00 AM</SelectItem>
                      <SelectItem value="07:30">7:30 AM</SelectItem>
                      <SelectItem value="08:00">8:00 AM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="weekend-different">Different Weekend Schedule</Label>
                  <p className="text-sm text-muted-foreground">Use different sleep times for weekends</p>
                </div>
                <Switch id="weekend-different" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Schedule</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage how you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Bedtime Reminder</Label>
                  <p className="text-sm text-muted-foreground">Receive a notification when it's time to sleep</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Sleep Analysis</Label>
                  <p className="text-sm text-muted-foreground">Get notified when your sleep analysis is ready</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>New Music Generated</Label>
                  <p className="text-sm text-muted-foreground">Receive alerts when new sleep music is generated</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Sleep Tips</Label>
                  <p className="text-sm text-muted-foreground">Weekly tips to improve your sleep quality</p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Marketing Updates</Label>
                  <p className="text-sm text-muted-foreground">News and special offers from SleepTunes</p>
                </div>
                <Switch />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Notification Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Plan</CardTitle>
              <CardDescription>Manage your subscription and billing information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Premium Plan</h3>
                    <p className="text-sm text-muted-foreground">$9.99/month</p>
                  </div>
                  <Badge className="bg-green-500">Active</Badge>
                </div>
                <div className="mt-4 text-sm text-muted-foreground">Next billing date: April 30, 2025</div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline">Change Plan</Button>
                <Button
                  variant="outline"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                >
                  Cancel Subscription
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Update your payment information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center space-x-4">
                  <CreditCardIcon className="h-6 w-6" />
                  <div>
                    <h3 className="font-medium">Visa ending in 4242</h3>
                    <p className="text-sm text-muted-foreground">Expires 12/25</p>
                  </div>
                </div>
              </div>

              <Button variant="outline">Update Payment Method</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>View your past invoices.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <div>
                    <h3 className="font-medium">March 31, 2025</h3>
                    <p className="text-sm text-muted-foreground">Premium Plan - Monthly</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$9.99</p>
                    <Button variant="link" className="h-auto p-0 text-sm">
                      Download
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between items-center py-2 border-b">
                  <div>
                    <h3 className="font-medium">February 28, 2025</h3>
                    <p className="text-sm text-muted-foreground">Premium Plan - Monthly</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$9.99</p>
                    <Button variant="link" className="h-auto p-0 text-sm">
                      Download
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between items-center py-2 border-b">
                  <div>
                    <h3 className="font-medium">January 31, 2025</h3>
                    <p className="text-sm text-muted-foreground">Premium Plan - Monthly</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$9.99</p>
                    <Button variant="link" className="h-auto p-0 text-sm">
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">View All Invoices</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

