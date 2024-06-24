import { useRef, useEffect } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "a-scene": any;
      "a-marker": any;
      "a-box": any;
      "a-entity": any;
    }
  }
}

const ARComponent = () => {
  const sceneRef = useRef(null);

  useEffect(() => {
    if (sceneRef.current) {
      const handleLoad = () => {
        console.log("AR.js and A-Frame scripts loaded");
      };

      const script1 = document.createElement("script");
      script1.src = "https://aframe.io/releases/1.2.0/aframe.min.js";
      script1.async = true;
      script1.onload = handleLoad;

      const script2 = document.createElement("script");
      script2.src =
        "https://cdn.rawgit.com/jeromeetienne/AR.js/2.0.0/aframe/build/aframe-ar.js";
      script2.async = true;
      script2.onload = handleLoad;

      document.body.appendChild(script1);
      document.body.appendChild(script2);

      return () => {
        document.body.removeChild(script1);
        document.body.removeChild(script2);
      };
    }
  }, []);

  return (
    <a-scene embedded ref={sceneRef}>
      <a-marker preset="hiro">
        <a-box position="0 0.5 0" material="color: yellow;"></a-box>
      </a-marker>
      <a-marker preset="kanji">
        <a-box position="0 0.5 0" material="color: blue;"></a-box>
      </a-marker>
      <a-entity camera></a-entity>
    </a-scene>
  );
};

export default ARComponent;
