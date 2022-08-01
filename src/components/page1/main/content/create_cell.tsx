import React, {
	ChangeEvent,
	ChangeEventHandler,
	Dispatch,
	useState,
	MouseEvent,
	CSSProperties,
	ReactElement,
	PropsWithChildren,
} from "react";
import styles from "./content.module.css";
import { useSelector } from "react-redux";
import { ActionsTypes, RootState, TypeDispatch } from "../../../../redux_state/state";
import { ModalWindow } from "./modal_window";
import shopping_cart from "../../../../image/shopping-cart.png";
import { useDispatch } from "react-redux";
import { addItemToShopAction, ValuesColorType, ValuesSizeType } from "../../../../redux_state/items";

type CreateCellPropsType = {
	callBack: (dataChild: any) => void;
	children?: React.ReactNode;
};

const CreateCell: React.FC<CreateCellPropsType> = (props): JSX.Element => {
	function show() {
		console.log("Render ShowItems");
		props.callBack(props.children);
		return props.children;
	}

	return <React.Fragment>{show()}</React.Fragment>;
};

export { CreateCell };
