import React, { useEffect, useRef, useState } from "react";
import styles from "./shopping_cart.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux_state/state";
import { Content } from "./content/content";

export let Shopping_cart: React.FC = (): JSX.Element => {
	console.log("Render Cart");

	return (
		<div className={styles.body}>
			<h3 className={styles.column1 + " " + styles.column_title}>Item</h3>
			<h3 className={styles.column + " " + styles.column_title}>Price</h3>
			<h3 className={styles.column + " " + styles.column_title}>Qty</h3>
			<h3 className={styles.column + " " + styles.column_title}>Total</h3>
			<Content parentStyles={{ column1: styles.column1, columnAll: styles.column }} />
		</div>
	);
};
