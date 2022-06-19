import { configureStore, createAction } from "@reduxjs/toolkit";
import { combineReducers, legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from "@reduxjs/toolkit/dist/devtoolsExtension";
import { devToolsEnhancerLogOnlyInProduction } from "@redux-devtools/extension";

const ADD_ITEM_TO_SHOP = "ADD_ITEM_TO_SHOP";

interface actionType {
	type: string;
	payload: any;
}

const initState = {
	cntItem: 5,
	arrayOfItems: [{}],
};

type ItemsStateType = typeof initState;

// Reducer
function itemsReducer(state: ItemsStateType = initState, action: actionType): ItemsStateType {
	switch (action.type) {
		case ADD_ITEM_TO_SHOP:
			return {
				...state,
				cntItem: state.cntItem++,
			};
		default:
	}
	return state;
}

export { itemsReducer };

type AddItemToShopActionType = {
	type: typeof ADD_ITEM_TO_SHOP;
	payload: {
		name: string;
		amount: number;
	};
};

export const addItemToShopAction = (name: string, amount: number): AddItemToShopActionType => ({
	type: ADD_ITEM_TO_SHOP,
	payload: { name, amount },
});

export type ActionsTypes = AddItemToShopActionType;
