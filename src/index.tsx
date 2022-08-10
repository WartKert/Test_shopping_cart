import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import styles from "./index.module.css";
import { Provider } from "react-redux";
import { store } from "./redux_state/state";
import {} from "./redux_state/brands";
import { HashRouter, Route, Routes } from "react-router-dom";

const ElementPage1 = React.lazy(() => import("./components/page1/page1"));
const ElementPage2 = React.lazy(() => import("./components/page2/page2"));

function Index() {
	return (
		<React.Fragment>
			<Provider store={store}>
				<HashRouter>
					<Suspense fallback={<div>Loading...</div>}>
						<Routes>
							<Route path='/' element={<ElementPage1 />} />
							<Route path='shopping_cart' element={<ElementPage2 />} />
							<Route path='*' element={<p> Error </p>} />
						</Routes>
						<footer className={styles.footer}></footer>
					</Suspense>
				</HashRouter>
			</Provider>
		</React.Fragment>
	);
}
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<Index />);
