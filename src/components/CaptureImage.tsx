import { useRef, useState } from "react";

interface CaptureImageProps {
  onCapture: (image: HTMLImageElement) => void;
}

const CaptureImage = ({ onCapture }: CaptureImageProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraStarted, setCameraStarted] = useState(false);

  const startCamera = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraStarted(true);
      }
    }
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        const image = new Image();
        image.src = canvasRef.current.toDataURL();

        // Preprocess image before passing to onCapture
        const resizedImage = document.createElement("canvas");
        resizedImage.width = 416;
        resizedImage.height = 416;
        const resizedContext = resizedImage.getContext("2d");
        if (resizedContext) {
          resizedContext.drawImage(
            image,
            0,
            0,
            resizedImage.width,
            resizedImage.height
          );

          const processedImage = new Image();
          processedImage.src = resizedImage.toDataURL();
          onCapture(processedImage);
        } else {
          console.error("Failed to get 2D context for resized canvas");
        }
      }
    }
  };

  return (
    <div className="capture-container">
      <video
        ref={videoRef}
        width="640"
        height="480"
        autoPlay
        className={cameraStarted ? "video-active" : ""}
      ></video>
      <div className="controls">
        {!cameraStarted && <button onClick={startCamera}>Start Camera</button>}
        {cameraStarted && <button onClick={takePhoto}>Take Photo</button>}
      </div>
      <canvas
        ref={canvasRef}
        width="640"
        height="480"
        className="hidden"
      ></canvas>
      <style jsx>{`
        .capture-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .controls {
          margin-top: 10px;
        }
        .video-active {
          border: 2px solid #4caf50;
        }
        .hidden {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default CaptureImage;
