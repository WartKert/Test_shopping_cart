import React from "react";
import { Header } from "./header/header";
import styles from "./page2.module.css";
import backgraundHeader from "../../image/background_header.jpg";
import { Shopping_cart } from "./main/shopping_cart_catalog";

const Page2: React.FC = (): JSX.Element => {
	return (
		<div className={styles.body}>
			<header className={styles.header} style={{ background: `url(${backgraundHeader})` }}>
				<Header />
			</header>
			<h2 className={styles.title}> Shopping cart</h2>
			<main className={styles.main}>
				<Shopping_cart />
			</main>
		</div>
	);
};

export default Page2;
