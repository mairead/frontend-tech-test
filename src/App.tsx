import { GameStateProvider } from "./context/gameStateContext";
import Board from "./components/Board";

function App() {
  return (
    <GameStateProvider>
      <Board />
    </GameStateProvider>
  );
}

export default App;
