import React, { useEffect, useRef, useState } from "react";
import styles from "./content.module.css";
import { useSelector } from "react-redux";
import { AppStateType, RootState } from "../../../../redux_state/state";

type ShowItemsPropsType = {
	// arrItems: number | null;
};

let ShowItems: React.FC<ShowItemsPropsType> = (props: ShowItemsPropsType): JSX.Element => {
	const stateItems = useSelector((state: RootState) => state.items).arrayOfItems;
	console.log("Render Content");
	const createDivElement: JSX.Element[] | string =
		stateItems?.map((elem): JSX.Element => {
			return (
				<div key={elem.id} className={styles.gridElem}>
					<img
						className={styles.image}
						src={"https://raw.githubusercontent.com/AzureBin/react-test/master/assets" + elem.image}
						alt='Изображение продукта'
					/>
					<h3 className={styles.text}>{elem.title}</h3>
					<h4 className={styles.text}>{"Brand" + " " + String(elem.brand)}</h4>
					<p className={styles.text}>{elem.regular_price.currency + " " + elem.regular_price.value}</p>
				</div>
			);
		}) ?? "Нет записей в каталоге";

	return <React.Fragment>{createDivElement}</React.Fragment>;
};

export { ShowItems };
