import { useContext } from "react";
import { GameStateContext } from "../context/gameStateContext";

type Props = {
  playerIndex: number;
};

export default function Score({ playerIndex }: Props) {
  const { state, dispatch } = useContext(GameStateContext);
  return (
    <p>
      <span className="sr-only">Player {playerIndex + 1} score: </span>
      {state.players[playerIndex].score}
    </p>
  );
}
