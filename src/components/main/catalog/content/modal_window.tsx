import React, { PropsWithChildren, ReactElement } from "react";
import ReactDOM from "react-dom";
import styles from "./modal_window.module.css";

type PropsModalWindowType = {
	elem?: any;
	children?: React.ReactNode;
};

function ModalWindow(props: PropsModalWindowType): JSX.Element {
	console.log("Render Modal");

	function toShow(children: React.ReactNode) {
		return React.cloneElement(children as ReactElement<PropsWithChildren<{ className: string }>>, { className: `${styles.gridElem}` });
	}

	return ReactDOM.createPortal(
		<div className={styles.window}>
			<div className={styles.element}>{toShow(props.children)}</div>
		</div>,
		document.body
	);
}

export { ModalWindow };
