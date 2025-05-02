"use server";

export async function analyzeSleepData(data: number[][]) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/predict-sleep`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in analyzeSleepData:", error);
    return { predictedLabels: [], predictedNames: [] };
  }
}
