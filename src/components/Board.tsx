import { useContext, useEffect } from "react";
import { StyledBoard, StyledBackground, StyledScores } from "./Board-styles";
import { actions } from "../actions/gameActions";
import Card from "./Card";
import Score from "./Score";
import { GameStateContext } from "../context/gameStateContext";

export default function Board() {
  const { state, dispatch } = useContext(GameStateContext);

  useEffect(() => {
    actions.getStarships()(dispatch);
  }, []);

  const onStartGame = () => {
    actions.startGame()(dispatch);
  };

  // TODO can show start button WithLoading design pattern to show once loaded
  return (
    <StyledBackground>
      <h1>Starship Top Trumps</h1>
      {state.players[0].cards.length === 0 && !state.endGame && (
        <button onClick={onStartGame} disabled={state.loading}>
          {state.loading ? "loading..." : "Start Game"}
        </button>
      )}
      <StyledScores>
        <Score playerIndex={0} />
        <Score playerIndex={1} />
      </StyledScores>
      <StyledBoard>
        {state.players[0].cards.length > 0 && !state.endGame && (
          <>
            <Card
              cards={state.players[0].cards}
              isActive={state.players[0].isActive}
            />
            <Card
              cards={state.players[1].cards}
              isActive={state.players[1].isActive}
            />
          </>
        )}
      </StyledBoard>
      {state.endGame && <h2>GAME OVER!</h2>}
    </StyledBackground>
  );
}
