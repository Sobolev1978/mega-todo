import todoReducer, {initialState} from "./redusers/todoReducer";
import {applyMiddleware, createStore} from "redux";
import thunk from 'redux-thunk';
import {composeWithDevTools} from "redux-devtools-extension";

const store = createStore(todoReducer, initialState, composeWithDevTools(applyMiddleware(thunk)));

export default store;