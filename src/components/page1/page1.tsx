import React from "react";
import { Header } from "./header/header";
import styles from "./page1.module.css";
import backgraundHeader from "../../image/background_header.jpg";
import { Aside } from "./aside/aside";
import { Catalog } from "./main/catalog";

const Page1: React.FC = (): JSX.Element => {
	return (
		<div className={styles.body}>
			<header className={styles.header} style={{ background: `url(${backgraundHeader})` }}>
				<Header />
			</header>
			<aside className={styles.aside}>
				<Aside />{" "}
			</aside>
			<main className={styles.main}>
				<Catalog />
			</main>
		</div>
	);
};

export default Page1;
