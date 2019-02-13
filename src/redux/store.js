import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./Connections";

export const store = createStore(rootReducer, composeWithDevTools());
