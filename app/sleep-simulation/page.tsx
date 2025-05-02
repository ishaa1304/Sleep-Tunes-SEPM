"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Progress } from "@/app/components/ui/progress";
import {
  MoonIcon,
  BrainIcon,
  ActivityIcon,
  PauseIcon,
  PlayIcon,
  SkipForwardIcon,
} from "lucide-react";
import { analyzeSleepData } from "../analyze-sleep/action";
import { SleepStageChart } from "@/app/components/sleeep-stage-chart";

// Sleep stage constants
const STAGES = [
  { id: 0, name: "Wake", color: "bg-amber-500", icon: ActivityIcon },
  { id: 1, name: "Light Sleep", color: "bg-indigo-400", icon: MoonIcon },
  { id: 2, name: "Deep Sleep", color: "bg-blue-500", icon: MoonIcon },
  { id: 3, name: "REM", color: "bg-purple-500", icon: BrainIcon },
];

// Sample data for each sleep stage
const SAMPLE_DATA = {
  wake: {
    x_motion: 0.45,
    y_motion: 0.38,
    z_motion: 0.52,
    heart_rate: 85,
    step_count: 3,
  },
  light: {
    x_motion: 0.15,
    y_motion: 0.12,
    z_motion: 0.18,
    heart_rate: 65,
    step_count: 0,
  },
  deep: {
    x_motion: 0.05,
    y_motion: 0.03,
    z_motion: 0.08,
    heart_rate: 55,
    step_count: 0,
  },
  rem: {
    x_motion: 0.1,
    y_motion: 0.08,
    z_motion: 0.12,
    heart_rate: 75,
    step_count: 0,
  },
};

// For demo purposes, we'll use a shorter interval
const CYCLE_INTERVAL = 15000; // 15 seconds for demo (represents 15 minutes)
const FULL_CYCLE_TIME = CYCLE_INTERVAL * 4; // Total time for a full cycle

export default function SleepSimulationPage() {
  const [currentStage, setCurrentStage] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [cycleProgress, setCycleProgress] = useState(0);
  const [sleepHistory, setSleepHistory] = useState<
    Array<{ time: Date; stage: number }>
  >([]);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);

  // Generate data for the current sleep stage
  const generateDataForStage = useCallback((stageId: number) => {
    let baseData;
    switch (stageId) {
      case 0:
        baseData = SAMPLE_DATA.wake;
        break;
      case 1:
        baseData = SAMPLE_DATA.light;
        break;
      case 2:
        baseData = SAMPLE_DATA.deep;
        break;
      case 3:
        baseData = SAMPLE_DATA.rem;
        break;
      default:
        baseData = SAMPLE_DATA.wake;
    }

    // Generate 60 data points with small variations
    return Array.from({ length: 60 }, () => ({
      x_motion: baseData.x_motion + (Math.random() * 0.1 - 0.05),
      y_motion: baseData.y_motion + (Math.random() * 0.1 - 0.05),
      z_motion: baseData.z_motion + (Math.random() * 0.1 - 0.05),
      heart_rate: baseData.heart_rate + (Math.random() * 4 - 2),
      step_count: baseData.step_count,
    }));
  }, []);

  // Analyze the current sleep stage
  const analyzeSleepStage = useCallback(
    async (stageId: number) => {
      const data = generateDataForStage(stageId);
      try {
        await analyzeSleepData(data);
        // In a real implementation, we would use the result
        // For the simulation, we'll just use the predetermined stage
      } catch (error) {
        console.error("Error analyzing sleep stage:", error);
      }
    },
    [generateDataForStage]
  );

  // Advance to the next sleep stage
  const advanceStage = useCallback(() => {
    const nextStage = (currentStage + 1) % STAGES.length;
    setCurrentStage(nextStage);
    setSleepHistory((prev) => [
      ...prev,
      { time: new Date(), stage: nextStage },
    ]);
    analyzeSleepStage(nextStage);
  }, [currentStage, analyzeSleepStage]);

  // Start the simulation
  const startSimulation = useCallback(() => {
    setIsRunning(true);
    if (!startTime) {
      const now = new Date();
      setStartTime(now);
      setSleepHistory([{ time: now, stage: currentStage }]);
    }
    analyzeSleepStage(currentStage);
  }, [currentStage, analyzeSleepStage, startTime]);

  // Pause the simulation
  const pauseSimulation = () => {
    setIsRunning(false);
  };

  // Reset the simulation
  const resetSimulation = () => {
    setIsRunning(false);
    setCurrentStage(0);
    setCycleProgress(0);
    setSleepHistory([]);
    setElapsedTime(0);
    setStartTime(null);
  };

  // Update progress and handle stage transitions
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setCycleProgress((prev) => {
        const newProgress = prev + 100 / (CYCLE_INTERVAL / 1000);
        if (newProgress >= 100) {
          advanceStage();
          return 0;
        }
        return newProgress;
      });

      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, advanceStage]);

  // Format elapsed time as hours and minutes
  const formatElapsedTime = () => {
    const hours = Math.floor(elapsedTime / 3600);
    const minutes = Math.floor((elapsedTime % 3600) / 60);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  // Get the current stage info
  const stage = STAGES[currentStage];
  const StageIcon = stage.icon;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Sleep Cycle Simulation</h1>
        <p className="text-muted-foreground mb-8">
          This simulation shows how a person typically progresses through
          different sleep stages during the night. Each stage transition
          represents 15 minutes in a real sleep cycle.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Current Sleep Stage</CardTitle>
              <CardDescription>
                {isRunning
                  ? "Simulation is running. Stage changes every 15 seconds (representing 15 minutes)."
                  : "Press Start to begin the simulation."}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-6">
              <div
                className={`h-24 w-24 rounded-full flex items-center justify-center mb-4 ${stage.color}`}
              >
                <StageIcon className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-2">{stage.name}</h2>
              <div className="w-full mt-4">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>Progress to next stage:</span>
                  <span>{Math.round(cycleProgress)}%</span>
                </div>
                <Progress value={cycleProgress} className="h-2" />
              </div>
              <div className="mt-6 text-center">
                <p className="text-lg font-semibold">Elapsed Time</p>
                <p className="text-3xl font-bold">{formatElapsedTime()}</p>
                <p className="text-sm text-muted-foreground">
                  (Simulated: {(elapsedTime * 15).toString()} minutes)
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              {isRunning ? (
                <Button onClick={pauseSimulation} variant="outline">
                  <PauseIcon className="mr-2 h-4 w-4" />
                  Pause
                </Button>
              ) : (
                <Button onClick={startSimulation}>
                  <PlayIcon className="mr-2 h-4 w-4" />
                  {startTime ? "Resume" : "Start"}
                </Button>
              )}
              <Button onClick={advanceStage} disabled={!startTime}>
                <SkipForwardIcon className="mr-2 h-4 w-4" />
                Next Stage
              </Button>
              <Button onClick={resetSimulation} variant="outline">
                Reset
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sleep Cycle Progression</CardTitle>
              <CardDescription>
                Visualization of sleep stages over time. A typical night
                includes multiple cycles through these stages.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <SleepStageChart sleepHistory={sleepHistory} />
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>About Sleep Cycles</CardTitle>
            <CardDescription>
              Understanding how sleep progresses through the night
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              During a typical night's sleep, you cycle through different sleep
              stages multiple times. Each complete cycle takes approximately
              90-110 minutes, with 4-6 cycles occurring during a full night's
              sleep.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-4">
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center">
                  <ActivityIcon className="h-5 w-5 mr-2 text-amber-500" />
                  Wake
                </h3>
                <p className="text-sm text-muted-foreground">
                  The awake stage occurs at the beginning of sleep and during
                  brief awakenings throughout the night. These awakenings are
                  normal and often not remembered.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center">
                  <MoonIcon className="h-5 w-5 mr-2 text-indigo-400" />
                  Light Sleep
                </h3>
                <p className="text-sm text-muted-foreground">
                  Light sleep is a transitional stage where your body begins to
                  relax. Your heart rate slows, body temperature drops, and you
                  can be easily awakened.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center">
                  <MoonIcon className="h-5 w-5 mr-2 text-blue-500" />
                  Deep Sleep
                </h3>
                <p className="text-sm text-muted-foreground">
                  Deep sleep is the most restorative stage. Your body repairs
                  tissues, builds bone and muscle, and strengthens your immune
                  system. It's harder to wake someone from deep sleep.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center">
                  <BrainIcon className="h-5 w-5 mr-2 text-purple-500" />
                  REM Sleep
                </h3>
                <p className="text-sm text-muted-foreground">
                  REM (Rapid Eye Movement) sleep is when most dreaming occurs.
                  Your brain is highly active, but your body is temporarily
                  paralyzed. REM is crucial for learning and memory
                  consolidation.
                </p>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg mt-4">
              <h3 className="font-semibold mb-2">Sleep Cycle Pattern</h3>
              <p className="text-sm text-muted-foreground">
                A typical sleep cycle progresses from wake to light sleep to
                deep sleep, then back to light sleep before entering REM. As the
                night progresses, REM periods become longer while deep sleep
                periods become shorter.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
