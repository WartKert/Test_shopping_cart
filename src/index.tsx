import React from "react";
import ReactDOM from "react-dom/client";
import { Header } from "./components/header/header";
import styles from "./index.module.css";
import backgraundHeader from "./image/background_header.jpg";
import { Provider } from "react-redux";
import { store } from "./redux_state/state";
import { useDispatch } from "react-redux";
import { getListItems, ThunkType } from "./redux_state/fetch";
import { AnyAction } from "redux";

function Index() {
	return (
		<div className={styles.body}>
			<Provider store={store}>
				<header className={styles.header} style={{ background: `url(${backgraundHeader})` }}>
					<Header />
				</header>
				<aside className={styles.aside}></aside>
				<main className={styles.main}></main>
				<footer className={styles.footer}></footer>
			</Provider>
		</div>
	);
}
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<Index />);
