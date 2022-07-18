import { ActionsTypes, ThunkType } from "./state";

const ADD_ITEM_TO_SHOP = "ADD_ITEM_TO_SHOP";
const ADD_ALL_ITES_TO_SHOP = "ADD_ALL_ITES_TO_SHOP";

interface actionType {
	type: string;
	payload: any;
}

const initState = {
	cntItem: 0,
	arrayOfItems: null as Array<ListItemsFromServerType> | null,
};

type ItemsStateType = typeof initState;

// Reducer
function itemsReducer(state: ItemsStateType = initState, action: ActionsTypes): ItemsStateType {
	// debugger;
	switch (action.type) {
		case ADD_ITEM_TO_SHOP:
			return {
				...state,
				cntItem: state.cntItem + action.payload.amount,
			};
		case ADD_ALL_ITES_TO_SHOP:
			return {
				...state,
				...action.payload,
			};
		default:
	}
	return state;
}

export { itemsReducer };

export type AddItemToShopActionType = {
	type: typeof ADD_ITEM_TO_SHOP;
	payload: {
		name: string;
		amount: number;
	};
};

type ValuesType = {
	label: string;
	value_index: number;
	value: string | number;
};

export type ValuesColorType = {
	attribute_id: number;
	attribute_code: string;
	label: string;
	values: { [key: string]: { label: string; value_index: number; value: string } };
};

export type ValuesSizeType = {
	attribute_id: number;
	attribute_code: string;
	label: string;
	position: number;
	id: number;
	values: { [key: string]: { label: string; value_index: number; value: number } };
};

type VariantsType = {
	attributes: { [key: string]: { code: string; value_index: number } };
	product: { id: number; sku: string; image: string };
};

export type ListItemsFromServerType = {
	type: string;
	id: number;
	sku: string;
	title: string;
	regular_price: { currency: string; value: number };
	image: string;
	brand: number;
	configurable_options?: { [key: string]: ValuesColorType | ValuesSizeType };
	variants?: { [key: string]: VariantsType };
};

export const addItemToShopAction = (name: string, amount: number): AddItemToShopActionType => ({
	type: ADD_ITEM_TO_SHOP,
	payload: { name, amount },
});

export type AddAllItemsToShopActionType = {
	type: typeof ADD_ALL_ITES_TO_SHOP;
	payload: {
		arrayOfItems: Array<ListItemsFromServerType> | null;
	};
};

export const addAllItemsToShopAction = (arrayOfItems: Array<ListItemsFromServerType> | null): AddAllItemsToShopActionType => ({
	type: ADD_ALL_ITES_TO_SHOP,
	payload: { arrayOfItems },
});

export const getListItems = (): ThunkType => {
	return async (dispatch, getState) => {
		const response = await fetch("https://raw.githubusercontent.com/AzureBin/react-test/master/assets/level3/products.json");
		let data: Array<ListItemsFromServerType> | null = null;
		if (response.ok) {
			data = (await response.json()) as ListItemsFromServerType[];
		}

		console.log(data);
		dispatch(addAllItemsToShopAction(data));
	};
};
