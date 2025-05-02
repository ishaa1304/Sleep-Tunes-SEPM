"use client";

import { useEffect, useRef } from "react";

interface SleepHistoryPoint {
  time: Date;
  stage: number;
}

interface SleepStageChartProps {
  sleepHistory: SleepHistoryPoint[];
}

const STAGE_COLORS = ["#f59e0b", "#818cf8", "#3b82f6", "#8b5cf6"];
const STAGE_NAMES = ["Wake", "Light Sleep", "Deep Sleep", "REM"];

export function SleepStageChart({ sleepHistory }: SleepStageChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || sleepHistory.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Draw background grid
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 0.5;

    // Horizontal grid lines for sleep stages
    const stageHeight = (rect.height - 40) / 4;
    for (let i = 0; i <= 4; i++) {
      const y = 20 + i * stageHeight;
      ctx.beginPath();
      ctx.moveTo(50, y);
      ctx.lineTo(rect.width - 20, y);
      ctx.stroke();

      if (i < 4) {
        // Add stage labels
        ctx.fillStyle = "#6b7280";
        ctx.font = "12px sans-serif";
        ctx.textAlign = "right";
        ctx.fillText(STAGE_NAMES[i], 45, y + stageHeight / 2 + 4);
      }
    }

    // If we have no history yet, just return
    if (sleepHistory.length === 0) return;

    // Calculate time range
    const startTime = sleepHistory[0].time.getTime();
    const endTime =
      sleepHistory.length > 1
        ? sleepHistory[sleepHistory.length - 1].time.getTime()
        : startTime + 3600000; // Default to 1 hour if only one point

    // Function to convert time to x position
    const timeToX = (time: Date) => {
      const timeValue = time.getTime();
      const timeRange = endTime - startTime;
      const timePosition = (timeValue - startTime) / timeRange;
      return 50 + timePosition * (rect.width - 70);
    };

    // Function to convert stage to y position
    const stageToY = (stage: number) => {
      return 20 + stage * stageHeight + stageHeight / 2;
    };

    // Draw sleep stage line
    ctx.strokeStyle = "#6366f1";
    ctx.lineWidth = 2;
    ctx.beginPath();

    // Move to first point
    ctx.moveTo(timeToX(sleepHistory[0].time), stageToY(sleepHistory[0].stage));

    // Draw lines to subsequent points
    for (let i = 1; i < sleepHistory.length; i++) {
      const point = sleepHistory[i];
      ctx.lineTo(timeToX(point.time), stageToY(point.stage));
    }
    ctx.stroke();

    // Draw points
    for (let i = 0; i < sleepHistory.length; i++) {
      const point = sleepHistory[i];
      const x = timeToX(point.time);
      const y = stageToY(point.stage);

      ctx.fillStyle = STAGE_COLORS[point.stage];
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();

      // Add time labels for some points
      if (i === 0 || i === sleepHistory.length - 1 || i % 4 === 0) {
        ctx.fillStyle = "#6b7280";
        ctx.font = "10px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(
          point.time.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          x,
          rect.height - 10
        );
      }
    }
  }, [sleepHistory]);

  return (
    <div className="w-full h-full relative">
      {sleepHistory.length === 0 ? (
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
          Start the simulation to see sleep cycle data
        </div>
      ) : null}
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
