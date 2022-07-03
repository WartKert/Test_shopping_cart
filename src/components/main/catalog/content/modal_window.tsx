import React, { Fragment, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./modal_window.module.css";

type PropsModalWindowType = {
	elem?: any;
	children?: React.ReactNode;
};

function ModalWindow(props: PropsModalWindowType): JSX.Element {
	console.log("Render Modal");

	return ReactDOM.createPortal(
		<div className={styles.window}>
			<div className={styles.element}>{props.children}</div>
		</div>,
		document.body
	);
}

export { ModalWindow };
