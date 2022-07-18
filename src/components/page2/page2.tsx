import React from "react";
import { Header } from "./header/header";
import styles from "./page2.module.css";
import backgraundHeader from "../../image/background_header.jpg";
import { Shopping_cart } from "./main/shopping_cart";
// import {} from "./redux_state/brands";
// import { Aside } from "./aside/aside";
// import { Catalog } from "./main/catalog";

function Page1(): JSX.Element {
	return (
		<div className={styles.body}>
			<header className={styles.header} style={{ background: `url(${backgraundHeader})` }}>
				<Header />
			</header>
			<h3 className={styles.title}> Shopping cart</h3>
			<main className={styles.main}>
				<Shopping_cart />
			</main>
		</div>
	);
}

export default Page1;
