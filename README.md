# 🌙 Sleep Tunes 🎵

This project combines **sleep stage analysis** with **AI-generated music** to create a personalized and calming experience. Based on simulated physiological data, it predicts the user's sleep stage and generates sleep-stage-specific music using Meta’s MusicGen model.

---

## 📌 Features

- 🧠 Predicts sleep stages using a deep learning model trained on physiological data
- 🎼 Generates AI music tailored to the detected sleep stage
- 🎛️ Simple and interactive web interface using Gradio
- 🔄 Fully automated pipeline: data simulation → stage prediction → music generation

---

## 🧠 Sleep Stage Classification

### Input Features:
- `activity`
- `heart_rate`
- `respiration_rate`
- `hour_of_day`

### Model:
- Trained using TensorFlow/Keras
- Input Shape: `(1, 30, 4)` — a sequence of 30 timesteps
- Output Classes:
  - Wake
  - Light Sleep
  - Deep Sleep
  - REM

---

## 🎶 Music Generation

Uses Meta's [MusicGen](https://github.com/facebookresearch/audiocraft) model (`musicgen-small`) to generate music clips based on the predicted sleep stage.

Each stage has a unique music prompt tailored for that sleep phase, ensuring the generated music complements the user's current mental state.

---

## 🖥️ User Interface

Built with **Gradio**, the UI allows users to:
- Simulate sleep data
- View predicted sleep stage
- Listen to music generated for that stage

### UI Elements:
- `Grab Data` button
- `Textbox`: Shows the predicted sleep stage
- `Audio Player`: Plays the generated .wav file

---

## 📂 Project Structure
sleep-music-generator/
├── sleep55.h5 # Trained sleep stage prediction model
├── main.py # Gradio interface and core logic
├── README.md # Project documentation
└── requirements.txt # Dependencies

🧾 Requirements
Python 3.8+

Gradio

TensorFlow / Keras

Audiocraft

NumPy, SciPy, pydub

torchaudio

