"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
// import Slider from "react-input-slider"; // TODO: refactor to use shadcn
import Lottie from "lottie-react";
import type { LottieRefCurrentProps } from "lottie-react";
import update from "immutability-helper";
import { useDropzone } from "react-dropzone";
import { v4 } from "uuid";
import CustomInput from "./CustomInput";
import { Player } from "./types";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LIMIT = 50;

const generatePlayerData = (index: number): Player => ({
  id: v4(),
  index,
  file: null,
  fileName: null,
  opacity: 1,
  frames: 0,
});
const generatePlayerDataState = (count: number): Player[] =>
  Array(count)
    .fill(null)
    .map((_, index) => generatePlayerData(index));

export default function Home() {
  const [playerData, setPlayerData] = useState<Player[]>(
    generatePlayerDataState(LIMIT),
  );
  const [numOfShownPlayers, setNumOfShownPlayers] = useState(3);
  const [isFileHovering, setIsFileHovering] = useState(false);
  const [currentFrameState, setCurrentFrameState] = useState(0);
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
  const lottieRef11 = useRef<LottieRefCurrentProps>(null);
  const lottieRef12 = useRef<LottieRefCurrentProps>(null);
  const lottieRef13 = useRef<LottieRefCurrentProps>(null);
  const lottieRef14 = useRef<LottieRefCurrentProps>(null);
  const lottieRef15 = useRef<LottieRefCurrentProps>(null);
  const lottieRef16 = useRef<LottieRefCurrentProps>(null);
  const lottieRef17 = useRef<LottieRefCurrentProps>(null);
  const lottieRef18 = useRef<LottieRefCurrentProps>(null);
  const lottieRef19 = useRef<LottieRefCurrentProps>(null);
  const lottieRef20 = useRef<LottieRefCurrentProps>(null);
  const lottieRef21 = useRef<LottieRefCurrentProps>(null);
  const lottieRef22 = useRef<LottieRefCurrentProps>(null);
  const lottieRef23 = useRef<LottieRefCurrentProps>(null);
  const lottieRef24 = useRef<LottieRefCurrentProps>(null);
  const lottieRef25 = useRef<LottieRefCurrentProps>(null);
  const lottieRef26 = useRef<LottieRefCurrentProps>(null);
  const lottieRef27 = useRef<LottieRefCurrentProps>(null);
  const lottieRef28 = useRef<LottieRefCurrentProps>(null);
  const lottieRef29 = useRef<LottieRefCurrentProps>(null);
  const lottieRef30 = useRef<LottieRefCurrentProps>(null);
  const lottieRef31 = useRef<LottieRefCurrentProps>(null);
  const lottieRef32 = useRef<LottieRefCurrentProps>(null);
  const lottieRef33 = useRef<LottieRefCurrentProps>(null);
  const lottieRef34 = useRef<LottieRefCurrentProps>(null);
  const lottieRef35 = useRef<LottieRefCurrentProps>(null);
  const lottieRef36 = useRef<LottieRefCurrentProps>(null);
  const lottieRef37 = useRef<LottieRefCurrentProps>(null);
  const lottieRef38 = useRef<LottieRefCurrentProps>(null);
  const lottieRef39 = useRef<LottieRefCurrentProps>(null);
  const lottieRef40 = useRef<LottieRefCurrentProps>(null);
  const lottieRef41 = useRef<LottieRefCurrentProps>(null);
  const lottieRef42 = useRef<LottieRefCurrentProps>(null);
  const lottieRef43 = useRef<LottieRefCurrentProps>(null);
  const lottieRef44 = useRef<LottieRefCurrentProps>(null);
  const lottieRef45 = useRef<LottieRefCurrentProps>(null);
  const lottieRef46 = useRef<LottieRefCurrentProps>(null);
  const lottieRef47 = useRef<LottieRefCurrentProps>(null);
  const lottieRef48 = useRef<LottieRefCurrentProps>(null);
  const lottieRef49 = useRef<LottieRefCurrentProps>(null);
  const lottieRef50 = useRef<LottieRefCurrentProps>(null);

  /**
   * @var playbackRef
   * @description
   * This is a ref to the current frame of the player. Range: `1 - maxFrames`
   */
  const playbackRef = useRef<number | null>(null);

  const lottieRefs = useMemo(
    () => [
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
      lottieRef11,
      lottieRef12,
      lottieRef13,
      lottieRef14,
      lottieRef15,
      lottieRef16,
      lottieRef17,
      lottieRef18,
      lottieRef19,
      lottieRef20,
      lottieRef21,
      lottieRef22,
      lottieRef23,
      lottieRef24,
      lottieRef25,
      lottieRef26,
      lottieRef27,
      lottieRef28,
      lottieRef29,
      lottieRef30,
      lottieRef31,
      lottieRef32,
      lottieRef33,
      lottieRef34,
      lottieRef35,
      lottieRef36,
      lottieRef37,
      lottieRef38,
      lottieRef39,
      lottieRef40,
      lottieRef41,
      lottieRef42,
      lottieRef43,
      lottieRef44,
      lottieRef45,
      lottieRef46,
      lottieRef47,
      lottieRef48,
      lottieRef49,
      lottieRef50,
    ],
    [],
  );

  const onPlayClick = useCallback(() => {
    lottieRefs.forEach((ref) => {
      ref.current?.play();
    });
  }, [lottieRefs]);

  const onStopClick = useCallback(() => {
    lottieRefs.forEach((ref) => {
      ref.current?.stop();
    });
    setCurrentFrameState(0);
  }, [lottieRefs]);

  // const onPrevFrame = useCallback(() => {
  //   lottieRefs.forEach((ref) => {
  //     const prevFrame = (ref.current?.getDuration(true) ?? 0) - 1;
  //     if (prevFrame <= 0) {
  //       return;
  //     }
  //     ref.current?.goToAndStop(prevFrame, true);
  //   });
  // }, []);

  // const onNextFrame = useCallback(() => {
  //   lottieRefs.forEach((ref, index) => {
  //     console.group(index);
  //     console.log("CURRENT FRAME");
  //     const currentFrame = ref.current?.getDuration(true) ?? 0;
  //     console.log(currentFrame);
  //     const nextFrame = (ref.current?.getDuration(true) ?? 0) + 1;
  //     console.log("NEXT FRAME");
  //     console.log(nextFrame);
  //     console.log(`PLAYER DATA max frames`);
  //     console.log(playerData[0]?.frames);
  //     console.log(`cond: ${nextFrame > playerData[0]?.frames}`);
  //     if (nextFrame > playerData[0]?.frames) {
  //       console.log("RETURN");
  //       return;
  //     }
  //     if (ref.current) {
  //       ref.current.goToAndStop(nextFrame, true);
  //     }
  //     console.groupEnd();
  //   });
  // }, []);

  const onSetFrame = useCallback(
    (frame: number) => {
      lottieRefs.forEach((ref) => {
        if (ref.current) {
          ref.current?.goToAndStop(frame, true);
        }
      });
    },
    [lottieRefs],
  );

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setPlayerData((prevCards: Player[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as Player],
        ],
      }),
    );
  }, []);

  // Handle file input change
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const reader = new FileReader();
      reader.onload = function (event) {
        try {
          if (typeof event.target?.result !== "string") {
            throw new Error("No target");
          }
          const jsonObj = JSON.parse(event.target.result);
          const fileName = e.target.value.split("\\").pop() ?? "no file";
          const frames = jsonObj?.assets.length ?? 0;
          if (frames === 0) {
            throw new Error("No frames");
          }
          setPlayerData(
            update(playerData, {
              [index]: {
                file: { $set: jsonObj },
                fileName: { $set: fileName },
                frames: { $set: frames },
              },
            }),
          );
        } catch (err) {
          console.log("Error in parsing json", err);
        }
      };
      if (e.target.files === null) {
        return;
      }
      reader.readAsText((e.target.files ?? [])[0]);
    },
    [playerData],
  );

  // Handle opacity change
  const handleOpacityChange = useCallback(
    (pos: number, index: number) => {
      setPlayerData(
        update(playerData, {
          [index]: { opacity: { $set: pos } },
        }),
      );
    },
    [playerData],
  );

  // Handle opacity input change
  const handleOpacityInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const newOpacity = parseFloat(e.target.value);
      if (isNaN(newOpacity)) {
        return;
      }
      setPlayerData(
        update(playerData, {
          [index]: { opacity: { $set: newOpacity } },
        }),
      );
    },
    [playerData],
  );

  const onDrop = useCallback((acceptedFiles: any) => {
    const handleFiles = async () => {
      let files: Player[] = generatePlayerDataState(acceptedFiles.length);
      // console.log("BEFORE", files);

      const readAsText = (file: Blob): Promise<string> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onabort = () => reject("file reading was aborted");
          reader.onerror = () => reject("file reading has failed");
          reader.onload = () => resolve(reader.result as string);
          reader.readAsText(file);
        });
      };

      for (let index = 0; index < acceptedFiles.length; index++) {
        try {
          const file = acceptedFiles[index];
          const binaryStr = await readAsText(file);
          const jsonObj = JSON.parse(binaryStr);
          // console.log(jsonObj);
          const frames = jsonObj?.assets.length ?? 0;
          if (frames === 0) {
            throw new Error("No frames");
          }
          files = update(files, {
            [index]: {
              file: { $set: jsonObj },
              fileName: { $set: file.name },
              frames: { $set: frames },
            },
          });
        } catch (err) {
          console.log("Error in parsing json", err);
        }
      }

      // console.log("AFTER", files);
      const firstFrameCount = files[0].frames;
      if (!files.every((file) => file.frames === firstFrameCount)) {
        throw new Error("Animation files have different frame counts");
      }

      setPlayerData(files);
      setNumOfShownPlayers(acceptedFiles.length);
      setIsFileHovering(false);
    };

    handleFiles();
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
  });

  useEffect(() => {
    const handleDragOver = (event: any) => {
      console.log(event);
      event.preventDefault(); // Necessary to allow dropping
      setIsFileHovering(true);
    };

    const handleDragLeave = (event: any) => {
      setIsFileHovering(false);
    };

    // Add event listeners to the window
    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("dragleave", handleDragLeave);

    return () => {
      // Cleanup the event listeners
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("dragleave", handleDragLeave);
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
              position: "absolute",
            }}
          >
            {playerData[i].file && (
              <Lottie
                lottieRef={lottieRefs[i]}
                autoplay={false}
                animationData={playerData[i].file}
                style={{ width: 250, height: 250 }}
                onEnterFrame={(event: any) => {
                  if (i === 0) {
                    playbackRef.current = event.currentTime + 1;
                    document.getElementById("frame-count")!.innerText =
                      `${parseInt(event.currentTime)}/${playerData[0].frames}`;
                  }
                }}
              />
            )}
          </div>
        )),
    [numOfShownPlayers, playerData, lottieRefs],
  );

  const inputs = useMemo(
    () =>
      Array(numOfShownPlayers)
        .fill(null)
        .map((_, i) => (
          <CustomInput
            key={`Input-${playerData[i].id}`}
            id={playerData[i].id}
            handleFileChange={(e) => handleFileChange(e, i)}
            handleOpacityChange={(pos) => handleOpacityChange(pos, i)}
            handleOpacityInputChange={(e) => handleOpacityInputChange(e, i)}
            index={i}
            fileName={playerData[i].fileName}
            opacity={playerData[i].opacity}
            moveCard={moveCard}
          />
        )),
    [
      numOfShownPlayers,
      playerData,
      moveCard,
      handleFileChange,
      handleOpacityChange,
      handleOpacityInputChange,
    ],
  );

  return (
    <div className="p-4">
      <div
        {...getRootProps()}
        className={
          isFileHovering
            ? "absolute left-[calc(50%-250px)] top-[calc(50%-100px)] z-50 flex h-[200px] w-[500px] items-center border-2 border-dashed border-gray-300 bg-gray-200 p-5 text-center"
            : "hidden"
        }
      >
        <input {...getInputProps()} />
        <p className="flex">Drop the files here ...</p>
      </div>
      <div style={{ width: "800px", height: "600px" }}>
        <div className="mb-4 flex items-center">
          <span>Number of players</span>
          <Input
            type="number"
            min="0"
            max={LIMIT}
            step="1"
            value={numOfShownPlayers}
            onChange={(e) => {
              const newCount = parseInt(e.target.value);
              setNumOfShownPlayers(newCount);
              if (newCount < numOfShownPlayers) {
                setPlayerData(
                  update(playerData, {
                    $splice: [[newCount, 1, generatePlayerData(newCount)]],
                  }),
                );
              }
            }}
            style={{ marginLeft: 20, width: 70 }}
          />
        </div>
        {inputs}
        <div className="align-center flex flex-row">
          <Button onClick={onPlayClick} variant={"outline"} className="mr-2">
            Play
          </Button>
          <Button onClick={onStopClick} variant={"outline"}>
            Stop
          </Button>
          {/* <button onClick={onPrevFrame}>-1 frame</button>
          <button onClick={onNextFrame}>+1 frame</button> */}
          <div className="align-center ml-6 flex">
            <Slider
              className="w-96"
              orientation="horizontal"
              step={1}
              min={1}
              max={56} // TODO: get max frames from playerData
              value={[playbackRef.current ?? 1]}
              onValueChange={([x]) => {
                playbackRef.current = x;
                onSetFrame(playbackRef.current ?? 1);
                setCurrentFrameState(x);
              }}
              onValueCommit={([x]) => {
                setCurrentFrameState(x);
              }}
              // styles={{
              //   track: { backgroundColor: "#ccc" },
              //   active: { backgroundColor: "#000" },
              //   thumb: { width: 20, height: 20 },
              // }}
            />
          </div>
          {typeof playerData?.[0].frames === "number" ? (
            <div className="ml-4 flex items-center">
              <span id="frame-count">{`${0}/${
                playerData?.[0].frames ?? 0
              }`}</span>
            </div>
          ) : null}
        </div>
        {players}
      </div>
    </div>
  );
}
