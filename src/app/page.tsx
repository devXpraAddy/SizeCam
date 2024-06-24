"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import CaptureImage from "../components/CaptureImage";
import DisplayDimensions from "../components/DisplayDimensions";
import { detectObject, calculateDimensions } from "../utils/measurement";

const ARComponent = dynamic(() => import("../components/ARComponent"), {
  ssr: false,
});

interface Dimensions {
  width: number;
  height: number;
}

const HomePage = () => {
  const [dimensions, setDimensions] = useState<Dimensions | null>(null);
  const knownWidth = 10; // Example known width in cm
  const knownDistance = 100; // Example known distance in cm

  const handleImageCapture = async (image: HTMLImageElement) => {
    console.log("Captured Image:", image);

    const predictions = await detectObject(image);
    console.log("Predictions:", predictions);

    if (predictions.length > 0) {
      const dimensions = calculateDimensions(
        predictions,
        knownWidth,
        knownDistance
      );
      setDimensions(dimensions);
    } else {
      alert("No object detected. Please try again.");
    }
  };

  return (
    <div className="home-page">
      <h1>Photograph Item/Get Dimensions</h1>
      <CaptureImage onCapture={handleImageCapture} />
      {dimensions && <DisplayDimensions dimensions={dimensions} />}
      <ARComponent />
      <style jsx>{`
        .home-page {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
        }
        h1 {
          font-size: 24px;
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
