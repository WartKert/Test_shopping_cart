import { configureStore } from "@reduxjs/toolkit";
import { combineReducers, legacy_createStore as createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { devToolsEnhancerLogOnlyInProduction } from "@redux-devtools/extension";
import { ActionsTypes, itemsReducer } from "./itemsReducer";
import thunk, { ThunkDispatch, ThunkMiddleware } from "redux-thunk";
import { getListItems } from "../components/main/catalog/fetch";

// Multi reducer
const rootReducer = combineReducers({
	items: itemsReducer,
});

type RootReducerType = typeof rootReducer;

export type AppStateType = ReturnType<RootReducerType>;

// Middleware
const composedEnhancer = composeWithDevTools(applyMiddleware<ThunkDispatch<AppStateType, undefined, ActionsTypes>, AppStateType>(thunk));

// Store
export const store = createStore(rootReducer, composedEnhancer);

export type RootState = ReturnType<typeof store.getState>;

(store.dispatch as ThunkDispatch<AppStateType, unknown, ActionsTypes>)(getListItems());
