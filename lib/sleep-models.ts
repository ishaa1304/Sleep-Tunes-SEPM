// This file simulates the RNN model's behavior in JavaScript
// In a real implementation, this would be an API call to a Python backend

// StandardScaler simulation for normalizing data
class StandardScaler {
  private means: number[] = [0, 0, 0, 0, 0]
  private stds: number[] = [1, 1, 1, 1, 1]

  // In a real implementation, these would be calculated from training data
  constructor() {
    // Approximate means and standard deviations for each feature
    // x_motion, y_motion, z_motion, heart_rate, step_count
    this.means = [0.05, 0.02, 0.08, 68.5, 0.2]
    this.stds = [0.3, 0.25, 0.35, 8.2, 0.8]
  }

  transform(data: any[]): number[][] {
    return data.map((point) => [
      (point.x_motion - this.means[0]) / this.stds[0],
      (point.y_motion - this.means[1]) / this.stds[1],
      (point.z_motion - this.means[2]) / this.stds[2],
      (point.heart_rate - this.means[3]) / this.stds[3],
      (point.step_count - this.means[4]) / this.stds[4],
    ])
  }
}

// Simulate RNN prediction
export async function predictSleepStage(data: any[]) {
  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Normalize the data
  const scaler = new StandardScaler()
  const scaledData = scaler.transform(data)

  // Ensure we have the right sequence length (60)
  let processedData = scaledData
  if (scaledData.length < 60) {
    // Pad with duplicates if we have fewer than 60 points
    const padding = Array(60 - scaledData.length)
      .fill(0)
      .map(() => scaledData[scaledData.length - 1] || scaledData[0] || [0, 0, 0, 0, 0])
    processedData = [...scaledData, ...padding]
  } else if (scaledData.length > 60) {
    // Take the last 60 points if we have more
    processedData = scaledData.slice(scaledData.length - 60)
  }

  // Calculate features that would influence the model
  const motionMagnitudes = processedData.map((point) =>
    Math.sqrt(point[0] * point[0] + point[1] * point[1] + point[2] * point[2]),
  )

  const avgHeartRate = processedData.reduce((sum, point) => sum + point[3], 0) / processedData.length
  const totalSteps = processedData.reduce((sum, point) => sum + point[4], 0)
  const motionVariability = calculateVariability(motionMagnitudes)

  // Simulate RNN model prediction
  // This is where the actual model would process the sequence data

  // Calculate probabilities based on the features
  // These calculations are simplified approximations of what an RNN might predict
  let probabilities = [0.1, 0.1, 0.1, 0.1] // Wake, Light, Deep, REM

  // Adjust probabilities based on motion and heart rate patterns
  // Low motion + low heart rate → likely deep sleep
  if (average(motionMagnitudes) < 0.5 && avgHeartRate < 60) {
    probabilities[2] += 0.5 // Increase Deep Sleep probability
  }
  // Low motion + higher heart rate → likely REM
  else if (average(motionMagnitudes) < 0.5 && avgHeartRate > 70) {
    probabilities[3] += 0.5 // Increase REM probability
  }
  // Medium motion + medium heart rate → likely light sleep
  else if (average(motionMagnitudes) < 1.0 && avgHeartRate < 70) {
    probabilities[1] += 0.5 // Increase Light Sleep probability
  }
  // High motion or steps → likely awake
  else if (average(motionMagnitudes) > 1.0 || totalSteps > 5) {
    probabilities[0] += 0.5 // Increase Wake probability
  }

  // Adjust based on variability (REM has higher variability in heart rate)
  if (motionVariability > 0.2 && avgHeartRate > 65) {
    probabilities[3] += 0.2 // Increase REM probability
  }

  // Normalize probabilities to sum to 1
  const sum = probabilities.reduce((a, b) => a + b, 0)
  probabilities = probabilities.map((p) => p / sum)

  // Get the predicted class (index of highest probability)
  const predictedClass = probabilities.indexOf(Math.max(...probabilities))

  // Return the prediction results
  return {
    predictedClass,
    confidence: probabilities[predictedClass],
    probabilities,
  }
}

// Helper functions
function average(arr: number[]): number {
  return arr.reduce((sum, val) => sum + val, 0) / arr.length
}

function calculateVariability(arr: number[]): number {
  const avg = average(arr)
  const squaredDiffs = arr.map((val) => (val - avg) ** 2)
  return Math.sqrt(average(squaredDiffs))
}

