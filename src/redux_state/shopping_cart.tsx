import { ActionsTypes } from "./state";

const ADD_ITEM_TO_SHOPPING_CART = "ADD_ITEM_TO_SHOPPING_CART";

export type ListShoppingCartType = {
	title: string;
	regular_price: { currency: string; value: number };
	brand: number;
	numberOfItems: number;
	product: { id: number; sku: string; image: string };
};

const initState = {
	items: null as Array<ListShoppingCartType> | null,
};

export type ShoppingCartType = typeof initState;

// Reducer
function shoppingCartReducer(state: ShoppingCartType = initState, action: ActionsTypes): ShoppingCartType {
	switch (action.type) {
		case ADD_ITEM_TO_SHOPPING_CART:
			return {
				...state,
				items: { ...(action.payload as ListShoppingCartType[]) },
			};

		default:
			break;
	}
	return state;
}

export { shoppingCartReducer };

export type AddItemToShoppingCartActionType = {
	type: typeof ADD_ITEM_TO_SHOPPING_CART;
	payload: ListShoppingCartType[] | null;
};

export const addItemToShoppingCartAction = (data: ListShoppingCartType[] | null): AddItemToShoppingCartActionType => ({
	type: ADD_ITEM_TO_SHOPPING_CART,
	payload: data,
});
