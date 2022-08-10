import React from "react";
import styles from "./shopping_cart_catalog.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState, TypeDispatch } from "../../../redux_state/state";
import { Content } from "./content/content";
import { addItemToShoppingCartAction } from "../../../redux_state/shopping_cart";

export let Shopping_cart: React.FC = (): JSX.Element => {
	const stateShopping = useSelector((state: RootState) => state.shopping).items;
	const dispatch = useDispatch<TypeDispatch>();

	function onHandlerClick(event: React.MouseEvent<HTMLImageElement>) {
		const target = event.target as HTMLImageElement;
		const [label, id] = target.id.split(" ");
		if (label === "Delete" && stateShopping) {
			let arr = Object.values(stateShopping);
			const index: number = arr.findIndex((elem) => elem.product.id === Number(id));
			arr.splice(index, 1);
			dispatch(addItemToShoppingCartAction(arr));
		}
	}

	return (
		<div className={styles.body} onClick={onHandlerClick}>
			<div className={styles.column_title}>
				<h3>Item</h3>
			</div>
			<div className={styles.column_title}>
				<h3>Price</h3>
			</div>
			<div className={styles.column_title}>
				<h3>Qty</h3>
			</div>
			<div className={styles.column_title}>
				<h3>Total</h3>
			</div>
			<Content />
		</div>
	);
};
