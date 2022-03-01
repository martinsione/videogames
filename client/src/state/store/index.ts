import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers";

// @ts-ignore - Otherwise it will complain about the extension missing type definitions
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export type AppState = ReturnType<typeof rootReducer>;
