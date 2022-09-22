import _ from "lodash";
import type { GameActions } from "../actions/gameActions";
import { Starship } from "../types/starship";
import { Player } from "../types/player";

// Show values in other players hand first and pause to let user's see?
// Could implement a pub/sub to handle updating items score/card state etc
// listening for animation events
// Immer or immutable helper for dealing with nested immutable state updates

export const initialState: {
  loading: boolean;
  error: boolean;
  errorMessage: string;
  starships: Starship[];
  endGame: boolean;
  roundsLeft: number;
  players: Player[];
} = {
  loading: false,
  error: false,
  errorMessage: "",
  starships: [],
  endGame: false,
  roundsLeft: 0,
  players: [
    {
      score: 0,
      cards: [],
      isActive: true,
    },
    {
      score: 0,
      cards: [],
      isActive: false,
    },
  ],
};

export const ACTIONS = {
  GET_STARSHIPS_PENDING: "get_starships_pending",
  GET_STARSHIPS_ERROR: "get_starships_error",
  GET_STARSHIPS_SUCCESS: "get_starships_success",
  START_GAME: "start_game",
  END_ROUND: "end_round",
};

export type Store = typeof initialState;

// categoryValue for films is passed as an array instead of length
// Should convert data at point of entry instead of conversion here
const convertValuesForComparison = (categoryValue: string) => {
  let stripChars = categoryValue.replace(/km+$/g, "");
  stripChars = categoryValue.replace(/,/g, "");
  let numeric = Number(stripChars);

  if (isNaN(numeric)) {
    return 0;
  }
  return numeric;
};

export const gameStateReducer = (state: Store, action: GameActions) => {
  switch (action.type) {
    case ACTIONS.GET_STARSHIPS_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: "",
      };
    case ACTIONS.GET_STARSHIPS_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload,
      };
    case ACTIONS.GET_STARSHIPS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        errorMessage: "",
        starships: action.payload.starships,
      };
    case ACTIONS.START_GAME:
      const shuffledDeck = _.shuffle(state.starships);
      const half = Math.ceil(shuffledDeck.length / 2);

      const player1Cards = shuffledDeck.slice(0, half);
      const player2Cards = shuffledDeck.slice(half);

      return {
        ...state,
        players: {
          ...state.players,
          [0]: {
            ...state.players[0],
            cards: player1Cards,
          },
          [1]: {
            ...state.players[1],
            cards: player2Cards,
          },
        },
        roundsLeft: player1Cards.length,
      };
    case ACTIONS.END_ROUND:
      const value1 = convertValuesForComparison(
        state.players[0].cards[0][action.payload]
      );
      const value2 = convertValuesForComparison(
        state.players[1].cards[0][action.payload]
      );
      let updateRoundsLeft = state.roundsLeft;
      updateRoundsLeft -= 1;
      return {
        ...state,
        players: {
          ...state.players,
          [0]: {
            ...state.players[0],
            cards: state.players[0].cards.slice(1),
            score:
              value1 > value2
                ? state.players[0].score + 1
                : state.players[0].score,
            isActive: value1 > value2,
          },
          [1]: {
            ...state.players[1],
            cards: state.players[1].cards.slice(1),
            score:
              value2 > value1
                ? state.players[1].score + 1
                : state.players[1].score,
            isActive: value2 > value1,
          },
        },
        endGame: updateRoundsLeft === 0,
        roundsLeft: updateRoundsLeft,
      };
    default:
      return initialState;
  }
};
