import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlayIcon, DownloadIcon, HeartIcon, CalendarIcon, AudioWaveformIcon as WaveformIcon } from "lucide-react"

export default function MusicLibraryPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Music Library</h2>
        <div className="flex items-center space-x-2">
          <Button>Generate New</Button>
        </div>
      </div>

      <Tabs defaultValue="recent" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="playlists">Playlists</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Calm Night Melody</CardTitle>
                <CardDescription className="flex items-center">
                  <CalendarIcon className="h-3 w-3 mr-1" />
                  Generated today
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-gradient-to-br from-blue-500 to-purple-600 rounded-md flex items-center justify-center">
                  <WaveformIcon className="h-16 w-16 text-white" />
                </div>
                <div className="mt-4 space-y-2">
                  <div className="h-1 w-full bg-gray-200 dark:bg-gray-800 rounded-full">
                    <div className="h-1 w-1/3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1:24</span>
                    <span>4:12</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button size="sm" variant="outline" className="w-10 h-10 p-0 rounded-full">
                  <PlayIcon className="h-4 w-4" />
                </Button>
                <div className="flex space-x-2">
                  <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                    <HeartIcon className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                    <DownloadIcon className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Deep Sleep Waves</CardTitle>
                <CardDescription className="flex items-center">
                  <CalendarIcon className="h-3 w-3 mr-1" />
                  Generated yesterday
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-gradient-to-br from-indigo-500 to-purple-600 rounded-md flex items-center justify-center">
                  <WaveformIcon className="h-16 w-16 text-white" />
                </div>
                <div className="mt-4 space-y-2">
                  <div className="h-1 w-full bg-gray-200 dark:bg-gray-800 rounded-full">
                    <div className="h-1 w-2/3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>3:45</span>
                    <span>5:30</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button size="sm" variant="outline" className="w-10 h-10 p-0 rounded-full">
                  <PlayIcon className="h-4 w-4" />
                </Button>
                <div className="flex space-x-2">
                  <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                    <HeartIcon className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                    <DownloadIcon className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Dreamy Ambient</CardTitle>
                <CardDescription className="flex items-center">
                  <CalendarIcon className="h-3 w-3 mr-1" />
                  Generated 2 days ago
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-gradient-to-br from-blue-600 to-indigo-600 rounded-md flex items-center justify-center">
                  <WaveformIcon className="h-16 w-16 text-white" />
                </div>
                <div className="mt-4 space-y-2">
                  <div className="h-1 w-full bg-gray-200 dark:bg-gray-800 rounded-full">
                    <div className="h-1 w-4/5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>4:12</span>
                    <span>5:00</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button size="sm" variant="outline" className="w-10 h-10 p-0 rounded-full">
                  <PlayIcon className="h-4 w-4" />
                </Button>
                <div className="flex space-x-2">
                  <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                    <HeartIcon className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                    <DownloadIcon className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>

          <h3 className="text-xl font-semibold mt-8">All Tracks</h3>

          <div className="border rounded-md">
            <div className="grid grid-cols-12 gap-4 p-4 border-b text-sm font-medium text-muted-foreground">
              <div className="col-span-1">#</div>
              <div className="col-span-5">Title</div>
              <div className="col-span-3">Date Generated</div>
              <div className="col-span-2">Duration</div>
              <div className="col-span-1"></div>
            </div>

            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="grid grid-cols-12 gap-4 p-4 border-b hover:bg-muted/50 transition-colors">
                <div className="col-span-1 flex items-center text-muted-foreground">{i}</div>
                <div className="col-span-5 flex items-center">
                  <div className="w-10 h-10 rounded bg-gradient-to-br from-blue-500 to-purple-600 mr-3 flex items-center justify-center">
                    <WaveformIcon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium">
                      {
                        [
                          "Calm Night Melody",
                          "Deep Sleep Waves",
                          "Dreamy Ambient",
                          "Relaxing Tones",
                          "Sleep Sanctuary",
                          "Midnight Calm",
                          "Gentle Waves",
                          "Dream Sequence",
                        ][i - 1]
                      }
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Based on{" "}
                      {
                        ["REM", "Deep Sleep", "Light Sleep", "Mixed", "REM", "Deep Sleep", "Light Sleep", "Mixed"][
                          i - 1
                        ]
                      }{" "}
                      patterns
                    </div>
                  </div>
                </div>
                <div className="col-span-3 flex items-center text-muted-foreground">
                  {
                    [
                      "Today",
                      "Yesterday",
                      "2 days ago",
                      "3 days ago",
                      "4 days ago",
                      "5 days ago",
                      "6 days ago",
                      "1 week ago",
                    ][i - 1]
                  }
                </div>
                <div className="col-span-2 flex items-center text-muted-foreground">
                  {["4:12", "5:30", "5:00", "4:45", "6:20", "5:15", "4:30", "5:45"][i - 1]}
                </div>
                <div className="col-span-1 flex items-center justify-end">
                  <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                    <PlayIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

