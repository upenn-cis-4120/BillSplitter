// src/components/Camera.js
import React, { useState } from 'react';

function Camera() {
  const [capturedImage, setCapturedImage] = useState(null);

  // Placeholder function for capture
  const handleCapture = () => {
    // Mock behavior: setting a placeholder image as if captured
    setCapturedImage('https://via.placeholder.com/300x400?text=Receipt+Image');
  };

  // Reset the captured image to retake
  const handleRetake = () => {
    setCapturedImage(null);
  };

  return (
    <div className="camera-page">
      <h2>Scan Receipt</h2>
      {!capturedImage ? (
        <div className="camera-feed">
          {/* Placeholder for camera feed */}
          <div className="camera-placeholder">Camera Feed</div>
          <button onClick={handleCapture} className="capture-button">
            Capture Receipt
          </button>
        </div>
      ) : (
        <div className="captured-image-container">
          <h3>Captured Image</h3>
          <img src={capturedImage} alt="Captured Receipt" className="captured-image" />
          <button onClick={handleRetake} className="retake-button">
            Retake
          </button>
        </div>
      )}
    </div>
  );
}

export default Camera;
