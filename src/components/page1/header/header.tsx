import React from "react";
import imgLogo from "../../../image/logo.png";
import imgBasketFree from "../../../image/basket_free_48px.png";
import styles from "./header.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux_state/state";
import { Link } from "react-router-dom";

export const Header: React.FC = (): JSX.Element => {
	const stateShop = useSelector((state: RootState) => state.shopping).items;

	return (
		<div className={styles.imageBlock}>
			<Link to='/' className={styles.image}>
				<img src={imgLogo} alt='Logo' title='Logo' />
			</Link>
			<Link to='shopping_cart' className={styles.image}>
				<img src={imgBasketFree} alt='ShopBasket'></img>
			</Link>

			<div className={styles.countItems}>{`${stateShop ? Object.values(stateShop).length : 0}`}</div>
		</div>
	);
};
