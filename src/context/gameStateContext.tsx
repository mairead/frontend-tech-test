import React, { useReducer, useMemo, createContext } from "react";
import { Store, gameStateReducer, initialState } from "./gameStateReducer";
import type { GameActions } from "../actions/gameActions";

type ProviderProps = {
  children: React.ReactNode;
};

type Context = {
  state: Store;
  dispatch: React.Dispatch<GameActions>;
};

export const GameStateContext = createContext<Context>({} as Context);

export const GameStateProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer<React.Reducer<Store, GameActions>>(
    gameStateReducer,
    initialState
  );

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <GameStateContext.Provider value={contextValue}>
      {children}
    </GameStateContext.Provider>
  );
};
