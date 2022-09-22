import { Starship } from "../types/starship";
import { ACTIONS } from "../context/gameStateReducer";

export const actions = {
  getStarships: () => async (dispatch) => {
    dispatch({ type: ACTIONS.GET_STARSHIPS_PENDING });
    try {
      const response = await fetch("https://swapi.dev/api/starships", {
        method: "GET",
      });

      const data = await response.json();

      if (response.ok) {
        dispatch({
          type: ACTIONS.GET_STARSHIPS_SUCCESS,
          payload: {
            starships: data.results,
          },
        });
      } else {
        dispatch({
          type: ACTIONS.GET_STARSHIPS_ERROR,
          payload: "400 or 500 error goes here",
        });
      }
    } catch (error) {
      dispatch({
        type: ACTIONS.GET_STARSHIPS_ERROR,
        payload: "API Could not connect",
      });
    }
  },
  startGame: () => (dispatch) => {
    dispatch({ type: ACTIONS.START_GAME });
  },
  endRound: (categoryId: string) => (dispatch) => {
    dispatch({ type: ACTIONS.END_ROUND, payload: categoryId });
  },
};

export const get_starships_success = (payload: {
  starships: Array<Starship>;
}): {
  type: "GET_STARSHIPS_SUCCESS";
  payload: {
    starships: Array<Starship>;
  };
} => ({
  type: "GET_STARSHIPS_SUCCESS",
  payload,
});

export const get_starships_pending = (payload: {
  loading: boolean;
}): {
  type: "GET_STARSHIPS_PENDING";
  payload: {
    loading: boolean;
  };
} => ({
  type: "GET_STARSHIPS_PENDING",
  payload,
});

export const get_starships_error = (
  payload: string
): {
  type: "GET_STARSHIPS_ERROR";
  payload: string;
} => ({
  type: "GET_STARSHIPS_ERROR",
  payload,
});

// Redux docs say discriminated union is an anti-pattern
export type GameActions =
  | ReturnType<typeof get_starships_success>
  | ReturnType<typeof get_starships_error>
  | ReturnType<typeof get_starships_pending>;
