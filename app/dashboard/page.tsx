import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MoonIcon,
  SunIcon,
  BedIcon,
  AudioWaveformIcon as WaveformIcon,
  PlayIcon,
  SkipForwardIcon,
  SkipBackIcon,
} from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button>Connect Device</Button>
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Sleep Analytics</TabsTrigger>
          <TabsTrigger value="music">My Music</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sleep Score</CardTitle>
                <MoonIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87/100</div>
                <p className="text-xs text-muted-foreground">+2% from last week</p>
                <div className="mt-4 h-1 w-full bg-gray-200 rounded-full">
                  <div
                    className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    style={{ width: "87%" }}
                  ></div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sleep Duration</CardTitle>
                <BedIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7h 12m</div>
                <p className="text-xs text-muted-foreground">+32m from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Deep Sleep</CardTitle>
                <SunIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1h 45m</div>
                <p className="text-xs text-muted-foreground">+12m from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Music Generated</CardTitle>
                <WaveformIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12 tracks</div>
                <p className="text-xs text-muted-foreground">Last generated: Today</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Sleep Patterns</CardTitle>
                <CardDescription>Your sleep stages over the past week</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[200px] w-full bg-gradient-to-r from-blue-100 via-purple-100 to-blue-100 dark:from-blue-950 dark:via-purple-950 dark:to-blue-950 rounded-md flex items-end p-2">
                  {/* This would be a chart in a real implementation */}
                  <div className="flex-1 flex items-end space-x-2">
                    {[0.4, 0.6, 0.8, 0.5, 0.7, 0.9, 0.6].map((height, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-sm"
                          style={{ height: `${height * 150}px` }}
                        ></div>
                        <span className="text-xs text-muted-foreground">{["M", "T", "W", "T", "F", "S", "S"][i]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Tonight's Music</CardTitle>
                <CardDescription>Generated based on your recent sleep patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Calm Night Melody</h3>
                    <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full w-1/3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1:24</span>
                      <span>4:12</span>
                    </div>
                  </div>
                  <div className="flex justify-center space-x-4">
                    <Button size="icon" variant="outline">
                      <SkipBackIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    >
                      <PlayIcon className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline">
                      <SkipForwardIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

