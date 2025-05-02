import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import {
  BrainIcon,
  HeadphonesIcon,
  MoonIcon,
  AudioWaveformIcon as WaveformIcon,
  BarChart4Icon,
  HeartIcon,
} from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto mb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">About SleepTunes</h1>
        <p className="text-xl text-muted-foreground">
          We're on a mission to help people sleep better through personalized music generated from their own sleep
          patterns.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <p className="text-lg text-muted-foreground mb-4">
            SleepTunes was founded in 2023 by a team of sleep scientists, musicians, and AI engineers who shared a
            common frustration with sleep issues and a passion for finding better solutions.
          </p>
          <p className="text-lg text-muted-foreground mb-4">
            After years of research into the relationship between sound, brainwaves, and sleep quality, we developed a
            revolutionary algorithm that analyzes your personal sleep patterns and generates custom music designed to
            help you fall asleep faster and stay asleep longer.
          </p>
          <p className="text-lg text-muted-foreground">
            Today, SleepTunes helps thousands of people around the world improve their sleep quality and wake up feeling
            refreshed and energized.
          </p>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-1">
          <div className="bg-background rounded-lg p-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4">
                <HeadphonesIcon className="h-12 w-12 mx-auto mb-2 text-blue-500" />
                <h3 className="text-2xl font-bold">10,000+</h3>
                <p className="text-sm text-muted-foreground">Tracks Generated Daily</p>
              </div>
              <div className="text-center p-4">
                <MoonIcon className="h-12 w-12 mx-auto mb-2 text-purple-500" />
                <h3 className="text-2xl font-bold">25,000+</h3>
                <p className="text-sm text-muted-foreground">Users Sleeping Better</p>
              </div>
              <div className="text-center p-4">
                <BarChart4Icon className="h-12 w-12 mx-auto mb-2 text-blue-500" />
                <h3 className="text-2xl font-bold">87%</h3>
                <p className="text-sm text-muted-foreground">Report Improved Sleep</p>
              </div>
              <div className="text-center p-4">
                <HeartIcon className="h-12 w-12 mx-auto mb-2 text-purple-500" />
                <h3 className="text-2xl font-bold">4.8/5</h3>
                <p className="text-sm text-muted-foreground">Average User Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-20">
        <h2 className="text-3xl font-bold mb-10 text-center">How SleepTunes Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                  <BrainIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Sleep Analysis</h3>
                <p className="text-muted-foreground">
                  Our algorithm analyzes your sleep patterns from your smart watch data, identifying your unique sleep
                  cycles, disruptions, and quality metrics.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4">
                  <WaveformIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Music Generation</h3>
                <p className="text-muted-foreground">
                  Based on your sleep data, we generate personalized music with specific frequencies, rhythms, and tones
                  that are scientifically proven to promote better sleep.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mb-4">
                  <HeadphonesIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Continuous Improvement</h3>
                <p className="text-muted-foreground">
                  As you use SleepTunes, our AI learns what works best for you and continuously refines your music to
                  improve your sleep quality over time.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white mb-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">The Science Behind SleepTunes</h2>
          <p className="text-lg mb-6">
            Our approach is based on extensive research in neuroscience, sleep medicine, and music therapy. Studies show
            that specific sound frequencies can synchronize with brain waves to promote relaxation and sleep.
          </p>
          <Link href="/science">
            <Button className="bg-white text-blue-600 hover:bg-gray-100">Learn More About Our Research</Button>
          </Link>
        </div>
      </div>

      <div className="mb-20">
        <h2 className="text-3xl font-bold mb-10 text-center">Meet Our Team</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="text-center">
              <div className="h-40 w-40 mx-auto rounded-full bg-slate-200 dark:bg-slate-800 mb-4"></div>
              <h3 className="text-xl font-bold">
                {["Dr. Sarah Chen", "Michael Rodriguez", "Dr. James Wilson", "Emma Thompson"][i - 1]}
              </h3>
              <p className="text-muted-foreground">
                {["Sleep Scientist", "AI Engineer", "Neuroscientist", "Music Therapist"][i - 1]}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-muted rounded-xl p-8 mb-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Sleep Better?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of people who have improved their sleep quality with SleepTunes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started Free
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

