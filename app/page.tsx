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

const LIMIT = 10;

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
            style={{ marginLeft: 20, width: 50 }}
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
