import "./styles.css";
import React, { useCallback, useMemo, useRef, useState } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import update, { Spec } from "immutability-helper";
import { v4 } from 'uuid';
import { Input } from "./Input";
import { Player } from "./Types";

const LIMIT = 10

const generatePlayerData = (index: number): Player => ({
  id: v4(),
  index,
  file: null,
  opacity: 1,
})
const generatePlayerDataState = (count: number): Player[] => (
  Array(count)
    .fill(null)
    .map((_, index) => (generatePlayerData(index)))
)


export default function App() {
  // Initial states for all five players
  const [playerData, setPlayerData] = useState<Player[]>(generatePlayerDataState(LIMIT));
  const [numOfShownPlayers, setNumOfShownPlayers] = useState(3);
  // const [files, setFiles] = useState(Array(5).fill(null));
  // const [opacities, setOpacities] = useState(Array(5).fill(1));
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
        // setFiles((prevFiles) =>
        //   prevFiles.map((file, i) => (i === index ? jsonObj : file))
        // );
        setPlayerData(
          update(playerData, {
            [index]: {
              file: { $set: jsonObj },
            },
          })
        )
      } catch (err) {
        console.log("Error in parsing json", err);
      }
    };
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
    // setOpacities((prevOpacities) =>
    //   prevOpacities.map((opacity, i) => (i === index ? newOpacity : opacity))
    // );
    setPlayerData(
      update(playerData, {
        [index]: { opacity: { $set: newOpacity } },
      })
    )
  }, [playerData]);

  const players = useMemo(
    () =>
      Array(5)
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
              />
            )}
          </div>
        )),
    [playerData]
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
            opacity={playerData[i].opacity}
            moveCard={moveCard} />
        )),
    [handleFileChange, handleOpacityChange, handleOpacityInputChange, playerData, numOfShownPlayers]
  );

  console.log('Player data', playerData)

  return (
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
      <div>
        <button onClick={onPlayClick}>Play</button>
        <button onClick={onStopClick}>Stop</button>
      </div>
      {players}
    </div>
  );
}
