import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";

let modelPromise: Promise<cocoSsd.ObjectDetection> | null = null;

export const loadModel = (): Promise<cocoSsd.ObjectDetection> => {
  if (!modelPromise) {
    modelPromise = cocoSsd.load();
  }
  return modelPromise;
};
