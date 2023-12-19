import "./styles.css";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Slider from "react-input-slider";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import update, { Spec } from "immutability-helper";
import { useDropzone } from 'react-dropzone';
import { v4 } from 'uuid';
import { Input } from "./Input";
import { Player } from "./Types";

const LIMIT = 10

const generatePlayerData = (index: number): Player => ({
  id: v4(),
  index,
  file: null,
  fileName: null,
  opacity: 1,
})
const generatePlayerDataState = (count: number): Player[] => (
  Array(count)
    .fill(null)
    .map((_, index) => (generatePlayerData(index)))
)


export default function App() {
  const [playerData, setPlayerData] = useState<Player[]>(generatePlayerDataState(LIMIT));
  const [numOfShownPlayers, setNumOfShownPlayers] = useState(3);
  const [isFileHovering, setIsFileHovering] = useState(false);
  const [shouldPlayAfterSettingFrame, setShouldPlayAfterSettingFrame] = useState(false);
  const lottieRef1 = useRef<LottieRefCurrentProps>(null);
  const lottieRef2 = useRef<LottieRefCurrentProps>(null);
  const lottieRef3 = useRef<LottieRefCurrentProps>(null);
  const lottieRef4 = useRef<LottieRefCurrentProps>(null);
  const lottieRef5 = useRef<LottieRefCurrentProps>(null);
  const lottieRef6 = useRef<LottieRefCurrentProps>(null);
  const lottieRef7 = useRef<LottieRefCurrentProps>(null);
  const lottieRef8 = useRef<LottieRefCurrentProps>(null);
  const lottieRef9 = useRef<LottieRefCurrentProps>(null);
  const lottieRef10 = useRef<LottieRefCurrentProps>(null);
  const playbackRef = useRef<number | null>(null);

  const lottieRefs = [
    lottieRef1,
    lottieRef2,
    lottieRef3,
    lottieRef4,
    lottieRef5,
    lottieRef6,
    lottieRef7,
    lottieRef8,
    lottieRef9,
    lottieRef10,
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

  const onPrevFrame = useCallback(() => {
    lottieRefs.forEach((ref) => {
      const frame = ref.current?.getDuration(true) ?? 0;
      ref.current?.goToAndStop(frame - 1, true);
    });
  }, []);

  const onNextFrame = useCallback(() => {
    lottieRefs.forEach((ref) => {
      const frame = ref.current?.getDuration(true) ?? 0;
      ref.current?.goToAndStop(frame + 1, true);
    });
  }, []);

  const onSetFrame = useCallback((frame: number) => {
    lottieRefs.forEach((ref) => {
      if (ref.current) {
        if (shouldPlayAfterSettingFrame) {
          ref.current?.goToAndPlay(frame, true)
        } else {
          ref.current?.goToAndStop(frame, true)
        }
      }
    });
  }, [shouldPlayAfterSettingFrame])

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setPlayerData((prevCards: Player[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as Player],
        ],
      }),
    )
  }, [playerData])

  // Handle file input change
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const reader = new FileReader();
    reader.onload = function (event) {
      try {
        if (typeof event.target?.result !== 'string') { throw new Error("No target") }
        const jsonObj = JSON.parse(event.target.result);
        const fileName = e.target.value.split("\\").pop() ?? "no file";
        setPlayerData(
          update(playerData, {
            [index]: {
              file: { $set: jsonObj },
              fileName: { $set: fileName },
            },
          })
        )
      } catch (err) {
        console.log("Error in parsing json", err);
      }
    };
    if (e.target.files === null) { return; }
    reader.readAsText((e.target.files ?? [])[0]);
  }, [playerData]);

  // Handle opacity change
  const handleOpacityChange = useCallback((pos: { x: number, y: number }, index: number) => {
    setPlayerData(
      update(playerData, {
        [index]: { opacity: { $set: pos.x } },
      })
    )
  }, [playerData]);

  // Handle opacity input change
  const handleOpacityInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newOpacity = parseFloat(e.target.value);
    if (isNaN(newOpacity)) {
      return;
    }
    setPlayerData(
      update(playerData, {
        [index]: { opacity: { $set: newOpacity } },
      })
    )
  }, [playerData]);

  const onDrop = useCallback((acceptedFiles: any) => {
    const handleFiles = async () => {
      let files: Player[] = generatePlayerDataState(acceptedFiles.length);
      console.log("BEFORE", files);

      const readAsText = (file: Blob): Promise<string> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onabort = () => reject('file reading was aborted');
          reader.onerror = () => reject('file reading has failed');
          reader.onload = () => resolve(reader.result as string);
          reader.readAsText(file);
        });
      };

      for (let index = 0; index < acceptedFiles.length; index++) {
        try {
          const file = acceptedFiles[index];
          const binaryStr = await readAsText(file);
          const jsonObj = JSON.parse(binaryStr);
          console.log(jsonObj);
          files = update(files, {
            [index]: {
              file: { $set: jsonObj },
              fileName: { $set: file.name },
            },
          });
        } catch (err) {
          console.log("Error in parsing json", err);
        }
      }

      console.log("AFTER", files);
      setPlayerData(files);
      setNumOfShownPlayers(acceptedFiles.length);
      setIsFileHovering(false);
    };

    handleFiles();
  }, []);
  
  const {
    getRootProps,
    getInputProps,
  } = useDropzone({ onDrop, noClick: true, noKeyboard: true });

  useEffect(() => {
    const handleDragOver = (event: any) => {
      event.preventDefault(); // Necessary to allow dropping
      setIsFileHovering(true);
    };

    const handleDragLeave = (event: any) => {
      setIsFileHovering(false);
    };

    // Add event listeners to the window
    window.addEventListener('dragover', handleDragOver);
    window.addEventListener('dragleave', handleDragLeave);

    return () => {
      // Cleanup the event listeners
      window.removeEventListener('dragover', handleDragOver);
      window.removeEventListener('dragleave', handleDragLeave);
    };
  }, []);

  const players = useMemo(
    () =>
      Array(numOfShownPlayers)
        .fill(null)
        .map((_, i) => (
          <div
            key={i}
            style={{
              opacity: playerData[i].opacity,
              marginTop: "10px",
              position: "absolute"
            }}
          >
            {playerData[i].file && (
              <Lottie
                lottieRef={lottieRefs[i]}
                autoplay={false}
                animationData={playerData[i].file}
                style={{ width: 250, height: 250 }}
                onEnterFrame={(event) => {
                  if (i === 0) {
                    console.log(event)
                  }
                }}
              />
            )}
          </div>
        )),
    [playerData, numOfShownPlayers]
  );

  const inputs = useMemo(
    () =>
      Array(numOfShownPlayers)
        .fill(null)
        .map((_, i) => (
          <Input
            key={`Input-${playerData[i].id}`}
            id={playerData[i].id}
            handleFileChange={(e) => handleFileChange(e, i)}
            handleOpacityChange={(pos) => handleOpacityChange(pos, i)}
            handleOpacityInputChange={(e) => handleOpacityInputChange(e, i)}
            index={i}
            fileName={playerData[i].fileName}
            opacity={playerData[i].opacity}
            moveCard={moveCard} />
        )),
    [handleFileChange, handleOpacityChange, handleOpacityInputChange, playerData, numOfShownPlayers]
  );

  // Conditional styling for when files are being dragged over
  const dropzoneStyle = useMemo(() => (
    isFileHovering
      ? {
        top: "calc(50% - 100px)",
        left: "calc(50% - 250px)",
        width: "500px",
        height: "200px",
        position: "absolute" as const,
        border: "3px dashed #ccc",
        padding: "20px",
        textAlign: "center" as const,
        alignItems: "center" as const,
        backgroundColor: "#eee",
        zIndex: 100,
        display: "flex",
      }
      : { display: "none" }
  ), [isFileHovering])

  return (
    <div>
      <div {...getRootProps()} style={dropzoneStyle}>
        <input {...getInputProps()} />
        <p style={{ flex: 1 }}>Drop the files here ...</p>
      </div>
      <div style={{ width: "800px", height: "600px" }}>
        <div style={{ marginBottom: "10px" }}>
          <span>Number of players</span>
          <input
            type="number"
            min="0"
            max={LIMIT}
            step="1"
            value={numOfShownPlayers}
            onChange={(e) => {
              const newCount = parseInt(e.target.value)
              setNumOfShownPlayers(newCount)
              if (newCount < numOfShownPlayers) {
                setPlayerData(
                  update(playerData, {
                    $splice: [[newCount, 1, generatePlayerData(newCount)]],
                  })
                )
              }
            }}
            style={{ marginLeft: 20, width: 50 }}
          />
        </div>
        {inputs}
        <div style={{ display: "flex", flexDirection: "row" }}>
          <button onClick={onPlayClick}>Play</button>
          <button onClick={onStopClick}>Stop</button>
          <button onClick={onPrevFrame}>-1 frame</button>
          <button onClick={onNextFrame}>+1 frame</button>
          <div style={{ marginLeft: 20 }}>
            <Slider
              axis="x"
              xstep={1}
              xmin={0}
              xmax={56}
              x={playbackRef.current ?? 0}
              onChange={({ x }) => {
                console.log(x)
                console.log(playbackRef.current)
                playbackRef.current = x
              }}
              styles={{
                track: { backgroundColor: "#ccc" },
                active: { backgroundColor: "#000" },
                thumb: { width: 20, height: 20 }
              }}
            />
          </div>
        </div>
        {players}
      </div>
    </div>
  );
}
