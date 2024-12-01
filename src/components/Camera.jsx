import React, { useState, useRef, useEffect } from 'react';
import Tesseract from 'tesseract.js';

function Camera() {
  const [capturedImage, setCapturedImage] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    if (!capturedImage) {
      startCamera();
    }
  }, [capturedImage]);

  // Function to start the camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream; // Keep track of the stream for stopping later
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing the camera: ', error);
    }
  };

  // Function to stop the camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
  };

  // Capture an image from the video feed
  const handleCapture = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, videoRef.current.videoWidth, videoRef.current.videoHeight);
      const imageData = canvasRef.current.toDataURL('image/png');
      setCapturedImage(imageData);
      stopCamera(); // Stop the camera after capturing
      handleOCR(imageData); // Perform OCR on the captured image
    }
  };

  // Perform OCR on the captured image
  const handleOCR = (image) => {
    setIsProcessing(true);
    Tesseract.recognize(
      image,
      'eng',
      {
        logger: (m) => console.log(m) // Log progress if needed
      }
    )
      .then(({ data: { text } }) => {
        setExtractedText(text);
        setIsProcessing(false);
      })
      .catch((error) => {
        console.error('Error during OCR: ', error);
        setIsProcessing(false);
      });
  };

  // Reset the captured image to retake
  const handleRetake = () => {
    setCapturedImage(null);
    setExtractedText('');
  };

  return (
    <div className="camera-page">
      <h2>Scan Receipt</h2>
      {!capturedImage ? (
        <div className="camera-feed">
          <video ref={videoRef} autoPlay className="camera-video" />
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
          {isProcessing ? (
            <p>Processing the image, please wait...</p>
          ) : (
            <div className="extracted-text">
              <h3>Extracted Receipt:</h3>
              <pre>{extractedText}</pre>
            </div>
          )}
        </div>
      )}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}

export default Camera;
