import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { WatchIcon, SmartphoneIcon, LaptopIcon, PlusIcon, BatteryIcon, RefreshCwIcon, TrashIcon } from "lucide-react"

export default function DevicesPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Connected Devices</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Device
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Apple Watch Series 8</CardTitle>
                <CardDescription>Connected 2 days ago</CardDescription>
              </div>
              <Badge className="bg-green-500">Active</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-full">
                <WatchIcon className="h-8 w-8 text-blue-500" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <BatteryIcon className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Battery: 78%</span>
                </div>
                <div className="text-sm text-muted-foreground">Last sync: 2 hours ago</div>
                <div className="text-sm text-muted-foreground">Firmware: 9.2.1</div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">
              <RefreshCwIcon className="mr-2 h-4 w-4" />
              Sync Now
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
            >
              <TrashIcon className="mr-2 h-4 w-4" />
              Remove
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>iPhone 14 Pro</CardTitle>
                <CardDescription>Connected 5 days ago</CardDescription>
              </div>
              <Badge className="bg-green-500">Active</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-full">
                <SmartphoneIcon className="h-8 w-8 text-blue-500" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <BatteryIcon className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Battery: 92%</span>
                </div>
                <div className="text-sm text-muted-foreground">Last sync: 30 minutes ago</div>
                <div className="text-sm text-muted-foreground">iOS: 16.5.1</div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">
              <RefreshCwIcon className="mr-2 h-4 w-4" />
              Sync Now
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
            >
              <TrashIcon className="mr-2 h-4 w-4" />
              Remove
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>MacBook Pro</CardTitle>
                <CardDescription>Connected 1 week ago</CardDescription>
              </div>
              <Badge variant="outline" className="text-yellow-500 border-yellow-500">
                Inactive
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-full">
                <LaptopIcon className="h-8 w-8 text-blue-500" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <BatteryIcon className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Battery: Unknown</span>
                </div>
                <div className="text-sm text-muted-foreground">Last sync: 3 days ago</div>
                <div className="text-sm text-muted-foreground">macOS: 13.4</div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">
              <RefreshCwIcon className="mr-2 h-4 w-4" />
              Sync Now
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
            >
              <TrashIcon className="mr-2 h-4 w-4" />
              Remove
            </Button>
          </CardFooter>
        </Card>
      </div>

      <h3 className="text-xl font-semibold mt-8">Add a New Device</h3>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="cursor-pointer hover:border-primary transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center justify-center">
              <WatchIcon className="h-8 w-8 mr-2" />
              Smart Watch
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-sm text-muted-foreground">
              Connect your smart watch to track sleep patterns and sync data.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="outline">Connect</Button>
          </CardFooter>
        </Card>

        <Card className="cursor-pointer hover:border-primary transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center justify-center">
              <SmartphoneIcon className="h-8 w-8 mr-2" />
              Smartphone
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-sm text-muted-foreground">
              Use your phone to play sleep music and track basic sleep data.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="outline">Connect</Button>
          </CardFooter>
        </Card>

        <Card className="cursor-pointer hover:border-primary transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center justify-center">
              <LaptopIcon className="h-8 w-8 mr-2" />
              Computer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-sm text-muted-foreground">
              Sync and manage your sleep data and music library.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="outline">Connect</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

