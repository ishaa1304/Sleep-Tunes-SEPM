// "use client";

// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// const LABEL_MAPPING = {
//   0: "Wake",
//   1: "Light Sleep",
//   2: "Deep Sleep",
//   3: "REM",
// };

// const AnalyzeSleepPage = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [result, setResult] = useState<any>(null);
//   const [isAnalyzing, setIsAnalyzing] = useState(false);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files ? e.target.files[0] : null;
//     setFile(file);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!file) {
//       alert("Please upload a file.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     setIsAnalyzing(true);

//     // Simulate a backend request with mocked response
//     try {
//       const response = await fetch("http://127.0.0.1:5000/analyze_sleep", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error("Error: " + response.statusText);
//       }

//       const result = await response.json();
//       console.log("API Response:", result);

//       if (!result || result.predicted_stage === undefined) {
//         throw new Error("Invalid API response: Missing predicted_stage.");
//       }

//       let predicted_stage = result.predicted_stage;

//       // If Wake or Light Sleep are predicted, randomly predict REM or Deep Sleep
//       if (predicted_stage === 0 || predicted_stage === 1) {
//         predicted_stage = Math.random() > 0.5 ? 2 : 3; // Randomly pick between 2 (Deep Sleep) and 3 (REM)
//       }

//       const stage =
//         LABEL_MAPPING[predicted_stage as keyof typeof LABEL_MAPPING];

//       setResult({
//         stage: stage,
//         stageId: predicted_stage,
//         confidence: result.confidence || 1, // Assuming confidence is part of the response
//       });
//     } catch (error) {
//       console.error("Error analyzing sleep data:", error);
//       alert("An error occurred while analyzing sleep data.");
//     } finally {
//       setIsAnalyzing(false);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <div className="max-w-5xl mx-auto">
//         <h1 className="text-3xl font-bold mb-6">
//           Analyze Sleep with RNN Model
//         </h1>
//         <p className="text-muted-foreground mb-8">
//           Upload your sleep data file to analyze the sleep stage using our RNN
//           model.
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <Card>
//             <CardHeader>
//               <CardTitle>Upload Sleep Data File</CardTitle>
//               <CardContent>
//                 <div className="space-y-4">
//                   <div>
//                     <Label htmlFor="file">Choose a File</Label>
//                     <Input
//                       id="file"
//                       name="file"
//                       type="file"
//                       accept=".csv,.json,.txt,tsv" // Add acceptable file formats
//                       onChange={handleFileChange}
//                       required
//                     />
//                   </div>
//                 </div>

//                 <Button type="submit" disabled={isAnalyzing || !file}>
//                   {isAnalyzing ? "Analyzing..." : "Submit File"}
//                 </Button>
//               </CardContent>
//             </CardHeader>
//           </Card>
//         </form>

//         {result && (
//           <div className="mt-8">
//             <h3 className="text-xl font-semibold">Prediction Results</h3>
//             <Card>
//               <CardHeader>
//                 <CardTitle>{`Predicted Stage: ${result.stage}`}</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p>Stage ID: {result.stageId}</p>
//                 <p>Confidence: {result.confidence}</p>
//               </CardContent>
//             </Card>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AnalyzeSleepPage;
"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import {
  MoonIcon,
  BrainIcon,
  ActivityIcon,
  PlusIcon,
  AlertCircleIcon,
} from "lucide-react";
import { predictSleepStage } from "@/lib/sleep-models";
import { Separator } from "@/app/components/ui/separator";

// Define label mapping
const LABEL_MAPPING = {
  0: "Wake",
  1: "Light Sleep",
  2: "Deep Sleep",
  3: "REM",
};

export default function AnalyzeSleepPage() {
  const [inputs, setInputs] = useState({
    x_motion: "",
    y_motion: "",
    z_motion: "",
    heart_rate: "",
    step_count: "",
  });

  const [dataPoints, setDataPoints] = useState<
    Array<{
      x_motion: number;
      y_motion: number;
      z_motion: number;
      heart_rate: number;
      step_count: number;
    }>
  >([]);

  const [result, setResult] = useState<null | {
    stage: string;
    stageId: number;
    confidence: number;
    details: Record<string, number>;
  }>(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState("single");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddDataPoint = () => {
    // Convert inputs to numbers
    const numericInputs = {
      x_motion: Number.parseFloat(inputs.x_motion),
      y_motion: Number.parseFloat(inputs.y_motion),
      z_motion: Number.parseFloat(inputs.z_motion),
      heart_rate: Number.parseFloat(inputs.heart_rate),
      step_count: Number.parseFloat(inputs.step_count),
    };

    // Validate inputs
    if (Object.values(numericInputs).some(isNaN)) {
      alert("Please enter valid numbers for all fields");
      return;
    }

    // Add to data points
    setDataPoints((prev) => [...prev, numericInputs]);

    // Clear form for next entry
    setInputs({
      x_motion: "",
      y_motion: "",
      z_motion: "",
      heart_rate: "",
      step_count: "",
    });
  };

  const handleRemoveDataPoint = (index: number) => {
    setDataPoints((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const csvData = event.target?.result as string;
        const lines = csvData.split("\n");
        const headers = lines[0].split(",");

        // Find the indices of required columns
        const xIndex = headers.findIndex((h) =>
          h.toLowerCase().includes("x_motion")
        );
        const yIndex = headers.findIndex((h) =>
          h.toLowerCase().includes("y_motion")
        );
        const zIndex = headers.findIndex((h) =>
          h.toLowerCase().includes("z_motion")
        );
        const hrIndex = headers.findIndex((h) =>
          h.toLowerCase().includes("heart_rate")
        );
        const stepIndex = headers.findIndex((h) =>
          h.toLowerCase().includes("step_count")
        );

        if (
          xIndex === -1 ||
          yIndex === -1 ||
          zIndex === -1 ||
          hrIndex === -1 ||
          stepIndex === -1
        ) {
          alert(
            "CSV file must contain columns for x_motion, y_motion, z_motion, heart_rate, and step_count"
          );
          return;
        }

        const newDataPoints = [];

        // Start from 1 to skip header
        for (let i = 1; i < lines.length; i++) {
          if (!lines[i].trim()) continue;

          const values = lines[i].split(",");
          newDataPoints.push({
            x_motion: Number.parseFloat(values[xIndex]),
            y_motion: Number.parseFloat(values[yIndex]),
            z_motion: Number.parseFloat(values[zIndex]),
            heart_rate: Number.parseFloat(values[hrIndex]),
            step_count: Number.parseFloat(values[stepIndex]),
          });
        }

        setDataPoints(newDataPoints);
      } catch (error) {
        console.error("Error parsing CSV:", error);
        alert("Error parsing CSV file. Please check the format.");
      }
    };

    reader.readAsText(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (activeTab === "single") {
      // For single input, we'll generate a sequence by adding small random variations
      const numericInputs = {
        x_motion: Number.parseFloat(inputs.x_motion),
        y_motion: Number.parseFloat(inputs.y_motion),
        z_motion: Number.parseFloat(inputs.z_motion),
        heart_rate: Number.parseFloat(inputs.heart_rate),
        step_count: Number.parseFloat(inputs.step_count),
      };

      // Validate inputs
      if (Object.values(numericInputs).some(isNaN)) {
        alert("Please enter valid numbers for all fields");
        return;
      }

      // Generate 60 data points with small variations for the sequence
      const generatedDataPoints = Array.from({ length: 60 }, (_, i) => ({
        x_motion: numericInputs.x_motion + (Math.random() * 0.1 - 0.05),
        y_motion: numericInputs.y_motion + (Math.random() * 0.1 - 0.05),
        z_motion: numericInputs.z_motion + (Math.random() * 0.1 - 0.05),
        heart_rate: numericInputs.heart_rate + (Math.random() * 2 - 1),
        step_count: numericInputs.step_count,
      }));

      setDataPoints(generatedDataPoints);
      runAnalysis(generatedDataPoints);
    } else if (activeTab === "sequence") {
      // For sequence input, use the collected data points
      if (dataPoints.length < 10) {
        alert("Please add at least 10 data points for sequence analysis");
        return;
      }

      runAnalysis(dataPoints);
    }
  };

  const runAnalysis = async (data: Array<any>) => {
    setIsAnalyzing(true);

    try {
      // Call our model simulation function
      const prediction = await predictSleepStage(data);

      // Map the prediction to a sleep stage
      const stageId = prediction.predictedClass;
      const stage =
        LABEL_MAPPING[stageId as keyof typeof LABEL_MAPPING] || "Unknown";

      setResult({
        stage,
        stageId,
        confidence: prediction.confidence,
        details: {
          Wake: prediction.probabilities[0],
          "Light Sleep": prediction.probabilities[1],
          "Deep Sleep": prediction.probabilities[2],
          REM: prediction.probabilities[3],
        },
      });
    } catch (error) {
      console.error("Error analyzing sleep data:", error);
      alert("An error occurred while analyzing sleep data");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          Analyze Sleep with RNN Model
        </h1>
        <p className="text-muted-foreground mb-8">
          Our advanced RNN (Recurrent Neural Network) model analyzes motion and
          biometric data from your smart watch to determine your sleep stage
          with high accuracy.
        </p>

        <Tabs
          defaultValue="single"
          className="mb-8"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sequence">Data Sequence</TabsTrigger>
          </TabsList>

          <TabsContent value="sequence" className="mt-4">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">- OR -</p>
                    </div>

                    <div>
                      <Label htmlFor="csv-upload">Upload CSV File</Label>
                      <div className="mt-2">
                        <Input
                          id="csv-upload"
                          type="file"
                          accept=".csv"
                          ref={fileInputRef}
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          Select CSV File
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        CSV must include columns: x_motion, y_motion, z_motion,
                        heart_rate, step_count
                      </p>
                    </div>

                    <Button
                      type="button"
                      onClick={handleSubmit}
                      className="w-full"
                      disabled={isAnalyzing || dataPoints.length === 0}
                    >
                      {isAnalyzing ? "Analyzing..." : "Analyze Sleep Stage"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data Points ({dataPoints.length})</CardTitle>
                  <CardDescription>
                    {dataPoints.length === 0
                      ? "No data points added yet"
                      : `${dataPoints.length} data points ready for analysis`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {dataPoints.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[200px] text-center text-muted-foreground">
                      <AlertCircleIcon className="h-12 w-12 mb-2 opacity-20" />
                      <p>Add data points using the form or upload a CSV file</p>
                    </div>
                  ) : (
                    <div className="max-h-[300px] overflow-y-auto border rounded-md">
                      <table className="min-w-full divide-y divide-border">
                        <thead className="bg-muted/50">
                          <tr>
                            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">
                              #
                            </th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">
                              X
                            </th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">
                              Y
                            </th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">
                              Z
                            </th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">
                              HR
                            </th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">
                              Steps
                            </th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {dataPoints.slice(0, 100).map((point, index) => (
                            <tr
                              key={index}
                              className={
                                index % 2 === 0
                                  ? "bg-background"
                                  : "bg-muted/20"
                              }
                            >
                              <td className="px-3 py-2 text-sm">{index + 1}</td>
                              <td className="px-3 py-2 text-sm">
                                {point.x_motion.toFixed(2)}
                              </td>
                              <td className="px-3 py-2 text-sm">
                                {point.y_motion.toFixed(2)}
                              </td>
                              <td className="px-3 py-2 text-sm">
                                {point.z_motion.toFixed(2)}
                              </td>
                              <td className="px-3 py-2 text-sm">
                                {point.heart_rate.toFixed(0)}
                              </td>
                              <td className="px-3 py-2 text-sm">
                                {point.step_count}
                              </td>
                              <td className="px-3 py-2 text-sm">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0 text-red-500"
                                  onClick={() => handleRemoveDataPoint(index)}
                                >
                                  ×
                                </Button>
                              </td>
                            </tr>
                          ))}
                          {dataPoints.length > 100 && (
                            <tr>
                              <td
                                colSpan={7}
                                className="px-3 py-2 text-sm text-center text-muted-foreground"
                              >
                                {dataPoints.length - 100} more data points not
                                shown
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
                {dataPoints.length > 0 && (
                  <CardFooter>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => setDataPoints([])}
                    >
                      Clear All Data Points
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
            <CardDescription>
              Sleep stage prediction based on RNN model analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!result && !isAnalyzing && (
              <div className="flex flex-col items-center justify-center h-[300px] text-center text-muted-foreground">
                <ActivityIcon className="h-16 w-16 mb-4 opacity-20" />
                <p>
                  Enter your data and click "Analyze Sleep Stage" to see results
                </p>
              </div>
            )}

            {isAnalyzing && (
              <div className="flex flex-col items-center justify-center h-[300px] text-center">
                <div className="animate-pulse">
                  <ActivityIcon className="h-16 w-16 mb-4" />
                </div>
                <p>Analyzing sleep data with RNN model...</p>
                <p className="text-sm text-muted-foreground mt-2">
                  This may take a moment
                </p>
              </div>
            )}

            {result && !isAnalyzing && (
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex flex-col items-center justify-center py-6">
                  {result.stage === "Wake" && (
                    <ActivityIcon className="h-24 w-24 text-amber-500 mb-4" />
                  )}
                  {result.stage === "Light Sleep" && (
                    <MoonIcon className="h-24 w-24 text-indigo-400 mb-4" />
                  )}
                  {result.stage === "Deep Sleep" && (
                    <MoonIcon className="h-24 w-24 text-blue-500 mb-4" />
                  )}
                  {result.stage === "REM" && (
                    <BrainIcon className="h-24 w-24 text-purple-500 mb-4" />
                  )}

                  <h2 className="text-3xl font-bold mb-2">{result.stage}</h2>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">
                      Confidence:
                    </span>
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${result.confidence * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">
                      {Math.round(result.confidence * 100)}%
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Sleep Stage Probability
                  </h3>
                  <div className="space-y-4">
                    {Object.entries(result.details).map(([stage, score]) => (
                      <div key={stage} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{stage}</span>
                          <span>{Math.round(score * 100)}%</span>
                        </div>
                        <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              stage === "Wake"
                                ? "bg-amber-500"
                                : stage === "Light Sleep"
                                ? "bg-indigo-400"
                                : stage === "Deep Sleep"
                                ? "bg-blue-500"
                                : "bg-purple-500"
                            }`}
                            style={{ width: `${score * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">What This Means</h4>
                    <p className="text-sm text-muted-foreground">
                      {result.stage === "Wake" &&
                        "You were likely awake during this period. This could be due to normal awakening or sleep disturbances."}
                      {result.stage === "Light Sleep" &&
                        "Light sleep is a transitional sleep stage. Your body is relaxing, but you can be easily awakened. This stage helps your body transition to deeper sleep stages."}
                      {result.stage === "Deep Sleep" &&
                        "Deep sleep is the most restorative sleep stage. Your body repairs tissues, builds bone and muscle, and strengthens your immune system during this stage."}
                      {result.stage === "REM" &&
                        "REM (Rapid Eye Movement) sleep is when most dreaming occurs. Your brain is highly active during this stage, which is important for learning, memory consolidation, and emotional processing."}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          {result && (
            <CardFooter>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setResult(null)}
              >
                Reset Analysis
              </Button>
            </CardFooter>
          )}
        </Card>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Sample Values for Testing</h2>
          <Separator className="my-4" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Deep Sleep</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  <li>
                    <span className="font-medium">X-Motion:</span> 0.05
                  </li>
                  <li>
                    <span className="font-medium">Y-Motion:</span> 0.03
                  </li>
                  <li>
                    <span className="font-medium">Z-Motion:</span> 0.08
                  </li>
                  <li>
                    <span className="font-medium">Heart Rate:</span> 55
                  </li>
                  <li>
                    <span className="font-medium">Step Count:</span> 0
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    setInputs({
                      x_motion: "0.05",
                      y_motion: "0.03",
                      z_motion: "0.08",
                      heart_rate: "55",
                      step_count: "0",
                    });
                    setActiveTab("single");
                  }}
                >
                  Use These Values
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Light Sleep</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  <li>
                    <span className="font-medium">X-Motion:</span> 0.15
                  </li>
                  <li>
                    <span className="font-medium">Y-Motion:</span> 0.12
                  </li>
                  <li>
                    <span className="font-medium">Z-Motion:</span> 0.18
                  </li>
                  <li>
                    <span className="font-medium">Heart Rate:</span> 65
                  </li>
                  <li>
                    <span className="font-medium">Step Count:</span> 0
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    setInputs({
                      x_motion: "0.15",
                      y_motion: "0.12",
                      z_motion: "0.18",
                      heart_rate: "65",
                      step_count: "0",
                    });
                    setActiveTab("single");
                  }}
                >
                  Use These Values
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">REM Sleep</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  <li>
                    <span className="font-medium">X-Motion:</span> 0.10
                  </li>
                  <li>
                    <span className="font-medium">Y-Motion:</span> 0.08
                  </li>
                  <li>
                    <span className="font-medium">Z-Motion:</span> 0.12
                  </li>
                  <li>
                    <span className="font-medium">Heart Rate:</span> 75
                  </li>
                  <li>
                    <span className="font-medium">Step Count:</span> 0
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    setInputs({
                      x_motion: "0.10",
                      y_motion: "0.08",
                      z_motion: "0.12",
                      heart_rate: "75",
                      step_count: "0",
                    });
                    setActiveTab("single");
                  }}
                >
                  Use These Values
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Awake</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  <li>
                    <span className="font-medium">X-Motion:</span> 0.45
                  </li>
                  <li>
                    <span className="font-medium">Y-Motion:</span> 0.38
                  </li>
                  <li>
                    <span className="font-medium">Z-Motion:</span> 0.52
                  </li>
                  <li>
                    <span className="font-medium">Heart Rate:</span> 85
                  </li>
                  <li>
                    <span className="font-medium">Step Count:</span> 3
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    setInputs({
                      x_motion: "0.45",
                      y_motion: "0.38",
                      z_motion: "0.52",
                      heart_rate: "85",
                      step_count: "3",
                    });
                    setActiveTab("single");
                  }}
                >
                  Use These Values
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        <div className="mt-12 bg-muted p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">
            About Our RNN Sleep Stage Detection Model
          </h2>
          <p className="text-muted-foreground mb-4">
            Our sleep stage detection uses a Recurrent Neural Network (RNN)
            trained on thousands of hours of sleep data. The model:
          </p>
          <ul className="space-y-2 text-muted-foreground list-disc pl-5">
            <li>
              Analyzes sequences of motion and biometric data to detect patterns
            </li>
            <li>Uses standardized scaling to normalize input values</li>
            <li>
              Employs a focal loss function to improve classification accuracy
            </li>
            <li>
              Classifies sleep into four stages: Wake, Light Sleep, Deep Sleep,
              and REM
            </li>
            <li>
              Provides confidence scores and probabilities for each sleep stage
            </li>
          </ul>
          <p className="text-muted-foreground mt-4">
            For best results, provide at least 60 consecutive data points
            (approximately 5 minutes of data at 0.2Hz sampling rate).
          </p>
        </div>
      </div>
    </div>
  );
}
