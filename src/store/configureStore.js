import { createStore } from "redux";
import rootReducer from "./home/reducers/homeReducer";

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState);
}
