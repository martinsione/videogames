import { IGame, IGameDetail, IGenre } from "../../types";
import { ActionType } from "../action-types";

interface IState {
  gameDetail: IGameDetail | undefined | null;
  games: IGame[];
  gamesBackup: IGame[];
  genres: IGenre[];
}

const initialState: IState = {
  gameDetail: undefined,
  games: [],
  gamesBackup: [],
  genres: [],
};

export default function rootReducer(state = initialState, action: any) {
  switch (action.type) {
    case ActionType.ADD_GAME:
      const newGames = [...state.gamesBackup, action.payload.videogame];
      return { ...state, backupGames: newGames, games: newGames };

    case ActionType.DELETE_GAME:
      const filteredGames = [...state.gamesBackup].filter((game: IGame) => {
        return game.id !== action.payload.id;
      });
      return { ...state, gamesBackup: filteredGames, games: filteredGames };

    case ActionType.EDIT_GAME:
      const editedGames = [...state.gamesBackup].map((game: IGame) =>
        game.id === action.payload.id ? action.payload : game
      );
      return { ...state, gamesBackup: editedGames, games: editedGames };

    case ActionType.FILTER_BY_GENRE:
      return {
        ...state,
        games: [...state.gamesBackup].filter((game: IGame) => {
          return game.genres.includes(action.payload);
        }),
      };

    case ActionType.FILTER_BY_ORIGIN: {
      if (action.payload === "database") {
        return {
          ...state,
          games: [...state.gamesBackup].filter((game: IGame) =>
            game.hasOwnProperty("createdInDb")
          ),
        };
      } else if (action.payload === "api") {
        return {
          ...state,
          games: [...state.gamesBackup].filter(
            (game: IGame) => !game.hasOwnProperty("createdInDb")
          ),
        };
      } else {
        return { ...state };
      }
    }

    case ActionType.GET_GAME_BY_ID:
      return { ...state, gameDetail: action.payload };

    case ActionType.GET_GAMES:
      return { ...state, gamesBackup: action.payload, games: action.payload };

    case ActionType.GET_GAMES_BY_NAME:
      return { ...state, gamesBackup: action.payload, games: action.payload };

    case ActionType.GET_GENRES:
      return { ...state, genres: action.payload };

    case ActionType.ORDER_BY_NAME:
      if (action.payload === "asc") {
        return {
          ...state,
          games: [...state.games].sort((a: IGame, b: IGame) =>
            a.name.localeCompare(b.name)
          ),
        };
      } else {
        return {
          ...state,
          games: [...state.games].sort((a: IGame, b: IGame) =>
            b.name.localeCompare(a.name)
          ),
        };
      }

    case ActionType.ORDER_BY_RATING:
      if (action.payload === "asc") {
        return {
          ...state,
          games: [...state.games].sort(
            (a: IGame, b: IGame) => b.rating - a.rating
          ),
        };
      } else {
        return {
          ...state,
          games: [...state.games].sort(
            (a: IGame, b: IGame) => a.rating - b.rating
          ),
        };
      }

    case ActionType.RESET_GAME_DETAIL:
      return { ...state, gameDetail: undefined };

    case ActionType.RESET_GAME_FILTERS:
      return { ...state, games: [...state.gamesBackup] };

    default:
      return state;
  }
}
