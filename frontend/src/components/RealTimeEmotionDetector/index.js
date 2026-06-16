import React, { useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { detectFaceEmotion } from "../api";

function RealTimeEmotionDetector() {
  const videoRef = useRef();
  const [emotion, setEmotion] = useState("");

  const startVideo = async () => {
    await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
    await faceapi.nets.faceExpressionNet.loadFromUri("/models");
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      videoRef.current.srcObject = stream;
    });
  };

  const handleDetect = async () => {
    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();
    if (detections.length > 0) {
      const expressions = detections[0].expressions;
      const maxExp = Object.entries(expressions).reduce((a, b) =>
        a[1] > b[1] ? a : b
      );
      const label = maxExp[0];
      let mapped = "netral";
      if (label === "happy") mapped = "senang";
      else if (label === "sad") mapped = "sedih";
      else if (label === "angry") mapped = "marah";
      setEmotion(mapped);
      const token = localStorage.getItem("token");
      await detectFaceEmotion({ emotion: mapped }, token);
    } else {
      setEmotion("Tidak terdeteksi");
    }
  };

  return (
    <div>
      <h3>Deteksi Emosi dari Wajah (Webcam)</h3>
      <video
        ref={videoRef}
        width={320}
        height={240}
        autoPlay
        onPlay={handleDetect}
      />
      <button onClick={startVideo}>Mulai Kamera</button>
      <div>Hasil: {emotion}</div>
    </div>
  );
}
export default RealTimeEmotionDetector;
