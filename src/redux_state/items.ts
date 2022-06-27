import { ActionsTypes, ThunkType } from "./state";

const ADD_ITEM_TO_SHOP = "ADD_ITEM_TO_SHOP";
const ADD_ALL_ITES_TO_SHOP = "ADD_ALL_ITES_TO_SHOP";

interface actionType {
	type: string;
	payload: any;
}

const initState = {
	cntItem: 5,
	arrayOfItems: null as Array<ListItemsFromServerType> | null,
};

type ItemsStateType = typeof initState;

// Reducer
function itemsReducer(state: ItemsStateType = initState, action: ActionsTypes): ItemsStateType {
	switch (action.type) {
		case ADD_ITEM_TO_SHOP:
			return {
				...state,
				cntItem: state.cntItem++,
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

export const addItemToShopAction = (name: string, amount: number): AddItemToShopActionType => ({
	type: ADD_ITEM_TO_SHOP,
	payload: { name, amount },
});

type ListItemsFromServerType = {
	type: string;
	id: number;
	sku: string;
	title: string;
	regular_price: { currency: string; value: number };
	image: string;
	brand: number;
};

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
		const response = await fetch("https://raw.githubusercontent.com/AzureBin/react-test/master/assets/products.json");
		let data: Array<ListItemsFromServerType> | null = null;
		if (response.ok) {
			data = (await response.json()) as ListItemsFromServerType[];
		}

		console.log(data);
		dispatch(addAllItemsToShopAction(data));
	};
};
