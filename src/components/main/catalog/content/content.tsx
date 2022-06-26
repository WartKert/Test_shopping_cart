import React, { useEffect, useRef, useState } from "react";
import styles from "./content.module.css";
import { useSelector } from "react-redux";
import { AppStateType, RootState } from "../../../../redux_state/state";

type ShowItemsPropsType = {
	curNumCol: number;
};

let ShowItems: React.FC<ShowItemsPropsType> = (props: ShowItemsPropsType): JSX.Element => {
	const stateItems = useSelector((state: RootState) => state.items).arrayOfItems;

	return <p>test</p>;
};

export { ShowItems };
