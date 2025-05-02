import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import {
  MoonIcon,
  AudioWaveformIcon as WaveformIcon,
  BrainIcon,
  HeadphonesIcon,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-blue-950 to-purple-900 text-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Sleep Better with SleepTunes
                </h1>
                <p className="max-w-[600px] text-gray-200 md:text-xl">
                  Personalized music generated from your sleep patterns to help
                  you fall asleep faster and stay asleep longer.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Get Started
                  </Button>
                </Link>
                <Link href="/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-[400px] aspect-square">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                <div className="relative bg-black/20 backdrop-blur-sm border border-white/10 p-6 rounded-3xl shadow-2xl">
                  <div className="space-y-2 mb-8">
                    <h3 className="text-xl font-semibold">
                      Your Sleep Last Night
                    </h3>
                    <div className="h-40 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg opacity-80"></div>
                    <p className="text-sm text-gray-300">Sleep Score: 87/100</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">Your Sleep Melody</h3>
                    <div className="flex items-center gap-2 p-3 bg-white/5 rounded-lg">
                      <WaveformIcon className="h-8 w-8 text-purple-400" />
                      <div className="flex-1">
                        <div className="h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded"></div>
                      </div>
                      <HeadphonesIcon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                How SleepTunes Works
              </h2>
              <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our advanced algorithm analyzes your sleep patterns and creates
                personalized music to improve your sleep quality.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                <MoonIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Track Your Sleep</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Connect your smart watch to track your sleep stages,
                  movements, and patterns throughout the night.
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                <BrainIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Analyze Your Data</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Our AI analyzes your sleep data to identify patterns and
                  determine what music will best help you sleep.
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900">
                <HeadphonesIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Generate Music</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  We generate unique music tailored to your sleep patterns that
                  helps you fall asleep and stay asleep.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                What Our Users Say
              </h2>
              <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Thousands of people are sleeping better with SleepTunes.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
            <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-800"></div>
                <div>
                  <h3 className="text-lg font-medium">Sarah K.</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Insomniac for 10 years
                  </p>
                </div>
              </div>
              <p className="mt-4 text-gray-500 dark:text-gray-400">
                "I've tried everything for my insomnia. SleepTunes is the only
                thing that's consistently helped me fall asleep faster and stay
                asleep longer."
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-800"></div>
                <div>
                  <h3 className="text-lg font-medium">Michael T.</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Shift worker
                  </p>
                </div>
              </div>
              <p className="mt-4 text-gray-500 dark:text-gray-400">
                "As a shift worker, my sleep schedule is all over the place.
                SleepTunes has been a game-changer for helping me get quality
                sleep regardless of when I go to bed."
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-800"></div>
                <div>
                  <h3 className="text-lg font-medium">Jessica R.</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    New parent
                  </p>
                </div>
              </div>
              <p className="mt-4 text-gray-500 dark:text-gray-400">
                "As a new mom, I need to maximize the little sleep I get.
                SleepTunes helps me fall back asleep quickly after late-night
                feedings."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Ready for Better Sleep?
              </h2>
              <p className="max-w-[600px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of people who have improved their sleep quality
                with SleepTunes.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
