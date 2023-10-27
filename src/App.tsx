import "./styles.css";
import React, { useCallback, useMemo, useRef, useState } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import Slider from "react-input-slider";

export default function App() {
  // Initial states for all five players
  const [files, setFiles] = useState(Array(5).fill(null));
  const [opacities, setOpacities] = useState(Array(5).fill(1));
  const lottieRef1 = useRef<LottieRefCurrentProps>(null);
  const lottieRef2 = useRef<LottieRefCurrentProps>(null);
  const lottieRef3 = useRef<LottieRefCurrentProps>(null);
  const lottieRef4 = useRef<LottieRefCurrentProps>(null);
  const lottieRef5 = useRef<LottieRefCurrentProps>(null);

  const lottieRefs = [
    lottieRef1,
    lottieRef2,
    lottieRef3,
    lottieRef4,
    lottieRef5
  ];

  const onPlayClick = useCallback(() => {
    lottieRefs.forEach((ref) => {
      ref.current?.play();
    });
  }, []);

  const onStopClick = useCallback(() => {
    lottieRefs.forEach((ref) => {
      ref.current?.stop();
    });
  }, []);

  // Handle file input change
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const reader = new FileReader();
    reader.onload = function (event) {
      try {
        if (typeof event.target?.result !== 'string') { throw new Error("No target") }
        const jsonObj = JSON.parse(event.target.result);
        setFiles((prevFiles) =>
          prevFiles.map((file, i) => (i === index ? jsonObj : file))
        );
      } catch (err) {
        console.log("Error in parsing json", err);
      }
    };
    reader.readAsText(e.target.files[0]);
  }, []);

  // Handle opacity change
  const handleOpacityChange = useCallback((pos, index) => {
    setOpacities((prevOpacities) =>
      prevOpacities.map((opacity, i) => (i === index ? pos.x : opacity))
    );
  }, []);

  // Handle opacity input change
  const handleOpacityInputChange = useCallback((e, index) => {
    const newOpacity = parseFloat(e.target.value);
    if (isNaN(newOpacity)) {
      return;
    }
    setOpacities((prevOpacities) =>
      prevOpacities.map((opacity, i) => (i === index ? newOpacity : opacity))
    );
  }, []);

  const players = useMemo(
    () =>
      Array(5)
        .fill(null)
        .map((_, i) => (
          <div
            key={i}
            style={{
              opacity: opacities[i],
              marginTop: "10px",
              position: "absolute"
            }}
          >
            {files[i] && (
              <Lottie
                lottieRef={lottieRefs[i]}
                autoplay={false}
                animationData={files[i]}
                style={{ width: 250, height: 250 }}
              />
            )}
          </div>
        )),
    [files, opacities]
  );

  const inputs = useMemo(
    () =>
      Array(5)
        .fill(null)
        .map((_, i) => (
          <div key={i} style={{ marginBottom: "20px" }}>
            <div>
              <input type="file" onChange={(e) => handleFileChange(e, i)} />
              <Slider
                axis="x"
                xstep={0.01}
                xmin={0}
                xmax={1}
                x={opacities[i]}
                onChange={(pos) => handleOpacityChange(pos, i)}
                styles={{
                  track: { backgroundColor: "#ccc" },
                  active: { backgroundColor: "#000" },
                  thumb: { width: 20, height: 20 }
                }}
              />
              <input
                type="number"
                min="0"
                max="1"
                step="0.01"
                value={opacities[i]}
                onChange={(e) => handleOpacityInputChange(e, i)}
                style={{ marginLeft: 20, width: 50 }}
              />
            </div>
          </div>
        )),
    [handleFileChange, handleOpacityChange, handleOpacityInputChange, opacities]
  );

  return (
    <div style={{ width: "800px", height: "600px" }}>
      {inputs}
      <div>
        <button onClick={onPlayClick}>Play</button>
        <button onClick={onStopClick}>Stop</button>
      </div>
      {players}
    </div>
  );
}
