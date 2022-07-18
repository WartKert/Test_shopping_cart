import React from "react";
import imgLogo from "../../../image/logo.png";
import imgBasketFree from "../../../image/basket_free_48px.png";
import imgBasketFull from "../../image/basket_full_48px.png";
import styles from "./header.module.css";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../../../redux_state/state";

type HeaderProps = {};

interface stateType {
	cntItem: number;
}

export function Header() {
	return (
		<div className={styles.imageBlock}>
			<img className={styles.image} src={imgLogo} alt='Logo' title='Logo' />
		</div>
	);
}
