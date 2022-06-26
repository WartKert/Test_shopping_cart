import { configureStore } from "@reduxjs/toolkit";
import { combineReducers, legacy_createStore as createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { devToolsEnhancerLogOnlyInProduction } from "@redux-devtools/extension";
import { itemsReducer, getListItems, AddItemToShopActionType, AddAllItemsToShopActionType } from "./items";
import { AddAllBrandsToShopActionType, brandsReducer, getListBrands } from "./brands";
import thunk, { ThunkAction, ThunkDispatch, ThunkMiddleware } from "redux-thunk";

// Multi reducer
const rootReducer = combineReducers({
	items: itemsReducer,
	brands: brandsReducer,
});

type RootReducerType = typeof rootReducer;

export type AppStateType = ReturnType<RootReducerType>;

// Middleware
const composedEnhancer = composeWithDevTools(applyMiddleware<ThunkDispatch<AppStateType, undefined, ActionsTypes>, AppStateType>(thunk));

// Store
export const store = createStore(rootReducer, composedEnhancer);

export type RootState = ReturnType<typeof store.getState>;

(store.dispatch as ThunkDispatch<AppStateType, unknown, ActionsTypes>)(getListItems());
(store.dispatch as ThunkDispatch<AppStateType, unknown, ActionsTypes>)(getListBrands());

export type ActionsTypes = AddItemToShopActionType | AddAllItemsToShopActionType | AddAllBrandsToShopActionType;

export type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>;
