import { ActionType } from "../action-types";

const initialState = {
  gameDetail: undefined,
  games: [],
  genres: [],
};

export default function rootReducer(state = initialState, action: any) {
  switch (action.type) {
    case ActionType.ADD_GAME:
      return { ...state, games: [...state.games, action.payload] };
    case ActionType.DELETE_GAME:
      return {
        ...state,
        games: state.games.filter((game) => game.id !== action.payload.id),
      };
    case ActionType.GET_GAMES:
      return { ...state, games: action.payload };
    case ActionType.GET_GAME_BY_ID:
      return { ...state, activeGame: action.payload };
    case ActionType.GET_GAME_BY_NAME:
      return { ...state, games: action.payload };
    case ActionType.GET_GENRES:
      return { ...state, genres: action.payload };
    default:
      return state;
  }
}
