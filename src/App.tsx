import { useState } from "react";
import BoardCard from "./components/BoardCard";

function App() {
  const [prevValue, setPrevValue] = useState<number>(-1);
  const [gameEnd, setGameEnd] = useState<number>(0);
  const [playerMovesCount, setPlayerMovesCount] = useState<number>(0);
  const [gameStats, setGameStats] = useState(
    [
      { id: "1", img: "html", state: "" },
      { id: "1", img: "html", state: "" },
      { id: "2", img: "css", state: "" },
      { id: "2", img: "css", state: "" },
      { id: "3", img: "js", state: "" },
      { id: "3", img: "js", state: "" },
      { id: "4", img: "node", state: "" },
      { id: "4", img: "node", state: "" },
      { id: "5", img: "react", state: "" },
      { id: "5", img: "react", state: "" },
      { id: "6", img: "scss", state: "" },
      { id: "6", img: "scss", state: "" },
    ].sort(() => 0.5 - Math.random())
  );

  const checkValues = (id: number) => {
    if (gameStats[id].id === gameStats[prevValue].id) {
      gameStats[id].state = "correct";
      gameStats[prevValue].state = "correct";
      setGameStats([...gameStats]);
      setPrevValue(-1);
      setGameEnd((prev) => prev + 2);
      setPlayerMovesCount((prev) => prev + 1);
    } else {
      gameStats[id].state = "wrong";
      gameStats[prevValue].state = "wrong";
      setGameStats([...gameStats]);
      setPrevValue(-1);
      setPlayerMovesCount((prev) => prev + 1);

      setTimeout(() => {
        gameStats[id].state = "";
        gameStats[prevValue].state = "";
        setGameStats([...gameStats]);
      }, 1000);
    }
  };

  const onClickCardkHandler = (event: React.MouseEvent<HTMLElement>) => {
    let clickedElementId: any = +event.currentTarget.id;

    if (prevValue === -1) {
      setPrevValue(clickedElementId);
      gameStats[clickedElementId].state = "active";
      setGameStats([...gameStats]);
      setPlayerMovesCount((prev) => prev + 1);
      return;
    }

    checkValues(clickedElementId);
  };

  const restartGame = () => {
    const newGameArr = gameStats.map((element) => {
      return {
        id: element.id,
        img: element.img,
        state: "",
      };
    });
    setGameStats(newGameArr.sort(() => 0.5 - Math.random()));
    setGameEnd(0);
    setPlayerMovesCount(0);
  };

  return (
    <>
      <div className="container">
        <h1 className="heading">Memory Game</h1>

        {gameEnd === gameStats.length && (
          <>
            <p className="game-msg">
              You finished game in {playerMovesCount} moves!
            </p>
            <button className="game-end" onClick={restartGame}>
              Start Again
            </button>
          </>
        )}

        <div className="board">
          {gameStats.map((item, index) => {
            return (
              <BoardCard
                id={index}
                img={item.img}
                onClickHandler={onClickCardkHandler}
                state={item.state}
                key={index}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
