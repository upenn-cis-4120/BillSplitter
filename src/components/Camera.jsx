import React, { useState, useRef, useEffect } from 'react';
import Tesseract from 'tesseract.js';
import { Stage, Layer, Rect } from 'react-konva';
import { useNavigate } from 'react-router-dom';

function ReceiptEditor() {
  const [capturedImage, setCapturedImage] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [annotations, setAnnotations] = useState([]);
  const [newAnnotation, setNewAnnotation] = useState(null);
  const [restaurant, setRestaurant] = useState('');
  const [amount, setAmount] = useState('');
  const [friends, setFriends] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const navigate = useNavigate();

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
    setAnnotations([]);
  };

  // Add annotation
  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.evt;
    setNewAnnotation({ x: offsetX, y: offsetY, width: 0, height: 0 });
  };

  const handleMouseMove = (e) => {
    if (newAnnotation) {
      const { offsetX, offsetY } = e.evt;
      setNewAnnotation((prev) => ({
        ...prev,
        width: offsetX - prev.x,
        height: offsetY - prev.y
      }));
    }
  };

  const handleMouseUp = () => {
    if (newAnnotation) {
      setAnnotations((prev) => [...prev, newAnnotation]);
      setNewAnnotation(null);
    }
  };

  // Save receipt and navigate to Bills page
  const handleSaveReceipt = () => {
    const newReceipt = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      restaurant: restaurant || 'Unknown',
      amount: parseFloat(amount) || 0,
      friends: friends ? friends.split(',').map(f => f.trim()) : [],
      status: 'Unpaid',
      image: capturedImage,
      annotations: annotations,
      extractedText: extractedText,
    };

    // Save the new receipt to local storage
    const storedReceipts = JSON.parse(localStorage.getItem('receipts')) || [];
    storedReceipts.push(newReceipt);
    localStorage.setItem('receipts', JSON.stringify(storedReceipts));

    // Navigate to the Bills page
    navigate('/bills');
  };

  return (
    <div className="receipt-editor" style={{ maxHeight: '100vh', overflowY: 'auto', paddingBottom: '100px' }}>
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
          <Stage
            width={500}
            height={500}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <Layer>
              {annotations.map((annotation, index) => (
                <Rect
                  key={index}
                  x={annotation.x}
                  y={annotation.y}
                  width={annotation.width}
                  height={annotation.height}
                  stroke="red"
                />
              ))}
              {newAnnotation && (
                <Rect
                  x={newAnnotation.x}
                  y={newAnnotation.y}
                  width={newAnnotation.width}
                  height={newAnnotation.height}
                  stroke="blue"
                />
              )}
            </Layer>
          </Stage>
          <div className="receipt-details-form">
            <h3>Receipt Details</h3>
            <label>
              Restaurant:
              <input type="text" value={restaurant} onChange={(e) => setRestaurant(e.target.value)} />
            </label>
            <label>
              Amount:
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </label>
            <label>
              Friends (comma-separated):
              <input type="text" value={friends} onChange={(e) => setFriends(e.target.value)} />
            </label>
          </div>
          <button onClick={handleSaveReceipt} className="save-receipt-button" style={{ marginTop: '20px' }}>
            Save Receipt
          </button>
        </div>
      )}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}

export default ReceiptEditor;
