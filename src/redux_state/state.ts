import { configureStore } from "@reduxjs/toolkit";
import { combineReducers, legacy_createStore as createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import {
	itemsReducer,
	getListItems,
	AddItemToShopActionType,
	AddAllItemsToShopActionType,
	SelectItemActionType,
	ChangeValueItemActionType,
} from "./items";
import { AddAllBrandsToShopActionType, AddFilterBrandsActionType, brandsReducer, getListBrands } from "./brands";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AddItemToShoppingCartActionType, shoppingCartReducer } from "./shopping_cart";

// Multi reducer
const rootReducer = combineReducers({
	items: itemsReducer,
	brands: brandsReducer,
	shopping: shoppingCartReducer,
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

export type ActionsTypes =
	| AddItemToShopActionType
	| AddAllItemsToShopActionType
	| AddAllBrandsToShopActionType
	| SelectItemActionType
	| AddFilterBrandsActionType
	| AddItemToShoppingCartActionType
	| ChangeValueItemActionType;

export type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>;

export type TypeDispatch = typeof store.dispatch;
