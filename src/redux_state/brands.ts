import { ActionsTypes, ThunkType } from "./state";

const ADD_ALL_BRANDS_TO_SHOP = "ADD_ALL_BRANDS_TO_SHOP";

const initState = {
	arrayOfBrands: null as Array<ListBrandsFromServerType> | null,
};

type BrandsStateType = typeof initState;

function brandsReducer(state: BrandsStateType = initState, action: ActionsTypes): BrandsStateType {
	switch (action.type) {
		case ADD_ALL_BRANDS_TO_SHOP:
			return {
				...state,
				...action.payload,
			};
		default:
	}
	return state;
}

export { brandsReducer };

export type ListBrandsFromServerType = {
	id: number;
	title: string;
	sort: string;
	code: string;
};

export type AddAllBrandsToShopActionType = {
	type: typeof ADD_ALL_BRANDS_TO_SHOP;
	payload: {
		arrayOfBrands: Array<ListBrandsFromServerType> | null;
	};
};

export const addAllBrandsToShopAction = (arrayOfBrands: Array<ListBrandsFromServerType> | null): AddAllBrandsToShopActionType => ({
	type: ADD_ALL_BRANDS_TO_SHOP,
	payload: { arrayOfBrands },
});

export const getListBrands = (): ThunkType => {
	return async (dispatch, getState) => {
		const response = await fetch("https://raw.githubusercontent.com/AzureBin/react-test/master/assets/brands.json");
		let data: Array<ListBrandsFromServerType> | null = null;
		if (response.ok) {
			data = (await response.json()) as ListBrandsFromServerType[];
		}

		console.log(data);
		dispatch(addAllBrandsToShopAction(data));
	};
};
