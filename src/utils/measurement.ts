import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";

export const detectObject = async (
  image: HTMLImageElement
): Promise<cocoSsd.DetectedObject[]> => {
  const model = await cocoSsd.load();
  console.log("Model loaded:", model);

  const predictions = await model.detect(image);
  console.log("Predictions from model:", predictions);

  return predictions;
};

export const calculateDimensions = (
  predictions: cocoSsd.DetectedObject[],
  knownWidth: number,
  knownDistance: number
): { width: number; height: number } => {
  const boundingBox = predictions[0].bbox;
  const objectWidthInPixels = boundingBox[2]; // width of the object in the image
  const focalLength = (objectWidthInPixels * knownDistance) / knownWidth;
  const distanceToObject = (knownWidth * focalLength) / objectWidthInPixels;
  return {
    width: knownWidth,
    height: (boundingBox[3] / boundingBox[2]) * knownWidth,
  }; // Assuming the height is proportional to the width
};
