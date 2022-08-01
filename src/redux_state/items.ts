import { ActionsTypes, ThunkType } from "./state";

const ADD_ITEM_TO_SHOP = "ADD_ITEM_TO_SHOP";
const ADD_ALL_ITES_TO_SHOP = "ADD_ALL_ITES_TO_SHOP";
const SELECT_ITEM = "SELECT_ITEM";

interface actionType {
	type: string;
	payload: any;
}

const initState = {
	cntItem: 0,
	arrayOfItems: null as Array<ListItemsType> | null,
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
		case SELECT_ITEM:
			return {
				...state,
				arrayOfItems: state.arrayOfItems!.map((elem) => {
					if (elem.id === action.payload.toId) {
						return (elem = {
							...elem,
							selected: action.payload.selected ? action.payload.selected?.map((elem) => elem) : null,
							selectItem: action.payload.selectItem,
						});
					}

					return elem;
				}),
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

export type VariantsType = {
	attributes: { [key: string]: { code: string; value_index: number } };
	product: { id: number; sku: string; image: string };
};

interface ListItemsFromServerType {
	type: string;
	id: number;
	sku: string;
	title: string;
	regular_price: { currency: string; value: number };
	image: string;
	brand: number;
	configurable_options?: { [key: string]: ValuesColorType | ValuesSizeType };
	variants?: { [key: number]: VariantsType };
}

export type SelectItemType = {
	Color: number | null;
	Size: number | null;
};

export interface ListItemsType extends ListItemsFromServerType {
	numberOfItems: number;
	selected: VariantsType[] | null;
	selectItem: SelectItemType;
}

export const addItemToShopAction = (name: string, amount: number): AddItemToShopActionType => ({
	type: ADD_ITEM_TO_SHOP,
	payload: { name, amount },
});

export type AddAllItemsToShopActionType = {
	type: typeof ADD_ALL_ITES_TO_SHOP;
	payload: {
		arrayOfItems: Array<ListItemsType> | null;
	};
};

export const addAllItemsToShopAction = (arrayOfItems: Array<ListItemsType> | null): AddAllItemsToShopActionType => ({
	type: ADD_ALL_ITES_TO_SHOP,
	payload: { arrayOfItems },
});

export type SelectItemActionType = {
	type: typeof SELECT_ITEM;
	payload: {
		selected: VariantsType[] | null;
		selectItem: SelectItemType;
		toId: number;
	};
};

export const selectItemAction = (toId: number, selected: VariantsType[] | null, selectItem: SelectItemType): SelectItemActionType => ({
	type: SELECT_ITEM,
	payload: { selected, selectItem, toId },
});

export const getListItems = (): ThunkType => {
	return async (dispatch, getState) => {
		const response = await fetch("https://raw.githubusercontent.com/AzureBin/react-test/master/assets/level3/products.json");
		let data: Array<ListItemsFromServerType> | null = null;
		if (response.ok) {
			data = (await response.json()) as ListItemsFromServerType[];
			data = (data as ListItemsType[]).map((elem: ListItemsType) => {
				return (elem = { ...elem, numberOfItems: 0, selected: null, selectItem: { Color: null, Size: null } });
			});
		}

		console.log(data);
		dispatch(addAllItemsToShopAction(data as ListItemsType[]));
	};
};
