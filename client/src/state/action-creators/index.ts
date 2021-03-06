import axios from "axios";
import { ActionType } from "../action-types";

// Set axios baseURL to backend url
axios.defaults.baseURL = process.env.REACT_APP_API_HOST;

export const addGame = (game: any) => async (dispatch: any) => {
  const { data } = await axios.post(`/videogame`, {
    ...game,
    onlyRequired: true,
  });
  return dispatch({ type: ActionType.ADD_GAME, payload: data });
};

export const deleteGame = (id: string) => async (dispatch: any) => {
  const { data } = await axios.delete(`/videogame`, { data: { id } });
  return dispatch({ type: ActionType.DELETE_GAME, payload: { id, data } });
};

export const editGame = (values: any) => async (dispatch: any) => {
  const { data } = await axios.put(`/videogame`, { ...values });
  return dispatch({ type: ActionType.EDIT_GAME, payload: data });
};

export const filterByGenre = (genre: string) => async (dispatch: any) => {
  return dispatch({ type: ActionType.FILTER_BY_GENRE, payload: genre });
};

export const filterByOrigin =
  (origin?: "api" | "database") => async (dispatch: any) => {
    return dispatch({ type: ActionType.FILTER_BY_ORIGIN, payload: origin });
  };

export const getGameById = (id: number | string) => async (dispatch: any) => {
  try {
    const { data } = await axios.get(`/videogame/${id}`);
    return dispatch({ type: ActionType.GET_GAME_BY_ID, payload: data });
  } catch (e) {
    return dispatch({ type: ActionType.GET_GAME_BY_ID, payload: null });
  }
};

export const getGames = () => async (dispatch: any) => {
  try {
    const { data } = await axios.get(`/videogames`);
    return dispatch({ type: ActionType.GET_GAMES, payload: data });
  } catch (e) {
    return dispatch({ type: ActionType.GET_GAME_BY_ID, payload: null });
  }
};

export const getGamesByName = (name: string) => async (dispatch: any) => {
  const { data } = await axios.get(`/videogames?name=${name}`);
  return dispatch({ type: ActionType.GET_GAMES_BY_NAME, payload: data });
};

export const getGenres = () => async (dispatch: any) => {
  const { data } = await axios.get(`/genres`);
  return dispatch({ type: ActionType.GET_GENRES, payload: data });
};

export const orderByName =
  (order?: "asc" | "desc") => async (dispatch: any) => {
    return dispatch({ type: ActionType.ORDER_BY_NAME, payload: order });
  };

export const orderByRating =
  (order?: "asc" | "desc") => async (dispatch: any) => {
    return dispatch({ type: ActionType.ORDER_BY_RATING, payload: order });
  };

export const resetGameDetail = () => async (dispatch: any) => {
  return dispatch({ type: ActionType.RESET_GAME_DETAIL });
};

export const resetGameFilters = () => async (dispatch: any) => {
  return dispatch({ type: ActionType.RESET_GAME_FILTERS });
};
