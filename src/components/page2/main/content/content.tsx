import React, { useState } from "react";
import styles from "./content.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux_state/state";
import shopping_cart from "../../../../image/shopping-cart.png";

type ContentPropsType = {
	parentStyles: { column1: string; columnAll: string };
};

const Content: React.FC<ContentPropsType> = (props): JSX.Element => {
	let store: React.ReactNode[];
	console.log("Render Content");

	const stateItems = useSelector((state: RootState) => state.items).arrayOfItems;
	const [PopUp, setPopUp] = useState<React.ReactNode>(null);

	return <React.Fragment></React.Fragment>;
};

export { Content };
