import React from "react";
import ReactDOM from "react-dom/client";
import { Header } from "./components/page1/header/header";
import styles from "./index.module.css";
import backgraundHeader from "./image/background_header.jpg";
import { Provider } from "react-redux";
import { store } from "./redux_state/state";
import { useDispatch } from "react-redux";
import {} from "./redux_state/brands";
import { Aside } from "./components/page1/aside/aside";
import { Catalog } from "./components/page1/main/catalog";
import { HashRouter, Route, Routes } from "react-router-dom";
import Page1 from "./components/page1/page1";
import Page2 from "./components/page2/page2";

function Index() {
	return (
		<React.Fragment>
			<Provider store={store}>
				<HashRouter>
					<Routes>
						<Route path='/' element={<Page1 />} />
						<Route path='shopping_cart' element={<Page2 />} />
						<Route path='*' element={<p> Error </p>} />
					</Routes>
					<footer className={styles.footer}></footer>
				</HashRouter>
			</Provider>
		</React.Fragment>
	);
}
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<Index />);
