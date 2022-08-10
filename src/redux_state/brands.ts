import { ActionsTypes, ThunkType } from "./state";

const ADD_ALL_BRANDS_TO_SHOP = "ADD_ALL_BRANDS_TO_SHOP";
const ADD_FILTER_BRANDS_TO_SHOP = "ADD_FILTER_BRANDS_TO_SHOP";

const initState = {
	brands: null as ListBrandsFromServerType[] | null,
	filterIdBrands: null as Array<number> | null,
};

type BrandsInitStateType = typeof initState;

function brandsReducer(state: BrandsInitStateType = initState, action: ActionsTypes): BrandsInitStateType {
	switch (action.type) {
		case ADD_ALL_BRANDS_TO_SHOP:
			return {
				...state,
				...action.payload,
			};
		case ADD_FILTER_BRANDS_TO_SHOP:
			return {
				...state,
				...action.payload,
				filterIdBrands: (state.filterIdBrands, action.payload.filterIdBrands),
			};
		default:
	}
	return state;
}

export { brandsReducer };

type ListBrandsFromServerType = {
	id: number;
	title: string;
	sort: string;
	code: string;
};

export type ListBrandsType = {
	brands: ListBrandsFromServerType[];
	filterIdBrands: Array<number> | null;
};

export type AddAllBrandsToShopActionType = {
	type: typeof ADD_ALL_BRANDS_TO_SHOP;
	payload: { brands: ListBrandsFromServerType[]; filterIdBrands: Array<number> | null };
};

export const addAllBrandsToShopAction = (data: ListBrandsType | null): AddAllBrandsToShopActionType => ({
	type: ADD_ALL_BRANDS_TO_SHOP,
	payload: { ...data! },
});

export type AddFilterBrandsActionType = {
	type: typeof ADD_FILTER_BRANDS_TO_SHOP;
	payload: { filterIdBrands: Array<number> | null };
};

export const addFilterBrandsAction = (filterIdBrands: Array<number> | null): AddFilterBrandsActionType => ({
	type: ADD_FILTER_BRANDS_TO_SHOP,
	payload: { filterIdBrands },
});

export const getListBrands = (): ThunkType => {
	return async (dispatch, getState) => {
		const response = await fetch("https://raw.githubusercontent.com/AzureBin/react-test/master/assets/brands.json");
		let data: ListBrandsType | null = null;
		if (response.ok) {
			let brandFromServer: ListBrandsFromServerType[] | null = await response.json();
			data = brandFromServer ? { brands: brandFromServer, filterIdBrands: null } : null;
		}
		dispatch(addAllBrandsToShopAction(data));
	};
};
