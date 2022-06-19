import React from "react";
import imgLogo from "../../image/logo.png";
import imgBasketFree from "../../image/basket_free_48px.png";
import imgBasketFull from "../../image/basket_full_48px.png";
import styles from "./header.module.css";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../../redux_state/state";
import { type } from "os";

type HeaderProps = {};

interface stateType {
	cntItem: number;
}

const useAppSel: TypedUseSelectorHook<RootState> = useSelector;

export function Header() {
	const item = useAppSel((state: RootState) => {
		return state.items.cntItem;
	});
	console.log("Header", item);

	return (
		<div className={styles.imageBlock}>
			<img className={styles.image} src={imgLogo} alt='Logo' title='Logo' />

			<img className={styles.image} src={imgBasketFree} alt='ShopBasket' />
			<div className={styles.countItems}>{`${item}`}</div>
		</div>
	);
}
