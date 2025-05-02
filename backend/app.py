from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
import tensorflow as tf
from keras.models import load_model
from sklearn.preprocessing import StandardScaler

app = Flask(__name__)

# Load the trained model
model = load_model('my_model.keras', custom_objects={'loss': focal(2)})

# Define label mapping
label_mapping = {0: "Wake", 1: "Light Sleep", 2: "Deep Sleep", 3: "REM", 4: "Other1", 5: "Other2"}

def preprocess_data(data):
    """ Preprocess input wearable data for model inference. """
    scaler = StandardScaler()
    
    # Extract necessary columns (adjust if needed)
    selected_features = ["x_motion", "y_motion", "z_motion", "heart_rate", "step_count"]
    
    # Ensure the input has correct columns
    data = data[selected_features]
    
    # Normalize the data
    scaled_data = scaler.fit_transform(data)
    
    # Define sequence length
    SEQUENCE_LENGTH = 60
    
    # Trim rows to be divisible by sequence length
    num_rows = scaled_data.shape[0]
    trimmed_rows = num_rows - (num_rows % SEQUENCE_LENGTH)
    
    X_test_trimmed = scaled_data[:trimmed_rows]
    X_test_reshaped = X_test_trimmed.reshape(-1, SEQUENCE_LENGTH, 5)
    
    return X_test_reshaped

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON data
        json_data = request.get_json()
        df = pd.DataFrame(json_data)
        
        # Preprocess data
        X_test = preprocess_data(df)

        # Make predictions
        predictions = model.predict(X_test)
        predicted_labels = np.argmax(predictions, axis=-1).flatten()

        # Convert to readable labels
        predicted_names = [label_mapping[int(label)] for label in predicted_labels]

        return jsonify({'predictions': predicted_names})

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
