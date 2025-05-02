import tensorflow.keras.backend as K
import tensorflow as tf
from keras.models import load_model
import numpy as np
from sklearn.preprocessing import StandardScaler

# ----------------------------
# Custom Focal Loss Function
# ----------------------------
def focal(a=2):
    def loss(y_true, y_pred):
        y_true = tf.squeeze(y_true)
        y_true = tf.one_hot(tf.cast(y_true, tf.uint8), y_pred.shape[-1])
        logits = -y_true * (1 - y_pred) ** a * tf.math.log(y_pred + K.epsilon())
        return K.mean(logits)
    return loss


# ----------------------------
# Load the .keras Model with Custom Loss
# ----------------------------
model_path = "my_model.keras"
model = load_model(model_path, custom_objects={"loss": focal(2)})
print("✅ Model loaded successfully!")
print(f"Model Output Shape: {model.output_shape}")


# ----------------------------
# Define Preprocessing and Prediction Function
# ----------------------------
# Define sequence length (should match model's input sequence length)
SEQUENCE_LENGTH = 60

# StandardScaler for feature scaling
scaler = StandardScaler()

# Label mapping
label_mapping = {
    0: "Wake",
    1: "Light Sleep",
    2: "Deep Sleep",
    3: "REM"
}

def preprocess_and_predict(data):
    # Convert incoming JSON data to numpy array
    input_data = np.array(data).astype(np.float32)

    # Normalize input data
    scaled_data = scaler.fit_transform(input_data)

    # Trim rows to fit SEQUENCE_LENGTH
    num_rows = scaled_data.shape[0]
    trimmed_rows = num_rows - (num_rows % SEQUENCE_LENGTH)
    X_test_trimmed = scaled_data[:trimmed_rows]

    # Reshape data to (num_samples, 60, 5)
    X_test_reshaped = X_test_trimmed.reshape(-1, SEQUENCE_LENGTH, 5)

    # Make predictions
    predictions = model.predict(X_test_reshaped)

    # Get predicted labels
    if len(predictions.shape) == 3:
        predicted_labels = np.argmax(predictions, axis=-1).flatten()
    else:
        predicted_labels = np.argmax(predictions, axis=1)

    # Map labels to sleep stage names
    predicted_names = [label_mapping.get(int(label), "Unknown") for label in predicted_labels]
    
    return predicted_names
