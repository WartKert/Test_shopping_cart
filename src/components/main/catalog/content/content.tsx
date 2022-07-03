import React, { forwardRef, MouseEvent, useEffect, useRef, useState } from "react";
import styles from "./content.module.css";
import { useSelector } from "react-redux";
import { AppStateType, RootState } from "../../../../redux_state/state";
import { ModalWindow } from "./modal_window";

type ShowItemsPropsType = {
	callBack: (dataChild: any) => void;
	children: React.ReactNode;
};

let ShowItems: React.FC<ShowItemsPropsType> = (props): JSX.Element => {
	function onPopUp(event: any) {
		debugger;
		let te = event.currentTarget.close("div");
	}

	function test() {
		console.log(props.children);
		const arr = React.Children.map(props.children, (child: React.ReactNode) => {
			return child;
		});
		props.callBack(arr);
		return arr;
	}

	return <React.Fragment>{test()}</React.Fragment>;
};

type ContentPropsType = {
	onResize?: () => void;
	class: string;
	style: any;
	ref: any;
};

const Content = React.forwardRef<HTMLDivElement, ContentPropsType>((props, ref): JSX.Element => {
	let store: React.ReactNode[];
	let el: any;
	console.log("Render Content");

	const stateItems = useSelector((state: RootState) => state.items).arrayOfItems;
	const [isPopUp, setIsPopUp] = useState<boolean>(false);
	const [PopUp, setPopUp] = useState<React.ReactNode>(null);

	const createDivElement: JSX.Element[] | string =
		stateItems?.map((elem): JSX.Element => {
			return (
				<div key={elem.id} className={styles.gridElem} data-user={"data-user" + elem.id}>
					<img
						className={styles.image}
						src={"https://raw.githubusercontent.com/AzureBin/react-test/master/assets" + elem.image}
						alt='Изображение продукта'
					/>
					<h3 className={styles.text}>{elem.title}</h3>
					<h4 className={styles.text}>{"Brand" + " " + String(elem.brand)}</h4>
					<p className={styles.text}>{elem.regular_price.currency + " " + elem.regular_price.value}</p>
				</div>
			);
		}) ?? "Нет записей в каталоге";

	function onResizeCell(event: React.MouseEvent<HTMLDivElement>) {
		debugger;
		let word: string | undefined = (event.target as HTMLDivElement).closest("div")?.dataset["user"]?.slice(9);
		if (word && !PopUp) {
			setPopUp(store[Number(word) - 1]);
		} else {
			setPopUp(null);
		}
	}

	function callBack(dataChild: any) {
		store = React.Children.map(dataChild, (child) => {
			return React.cloneElement(child, { className: undefined });
		});
	}

	return (
		<div className={props.class} style={props.style} ref={ref} onClick={onResizeCell}>
			<ShowItems callBack={callBack}>{createDivElement}</ShowItems>
			{PopUp && <ModalWindow>{PopUp}</ModalWindow>}
		</div>
	);
});

export { Content };
