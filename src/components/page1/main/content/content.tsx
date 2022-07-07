import React, { useState } from "react";
import styles from "./content.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux_state/state";
import { ModalWindow } from "./modal_window";
import shopping_cart from "../../../../image/shopping-cart.png";

type ShowItemsPropsType = {
	callBack: (dataChild: any) => void;
	children: React.ReactNode;
};

let ShowItems: React.FC<ShowItemsPropsType> = (props): JSX.Element => {
	function show() {
		console.log(props.children);
		const arr = React.Children.map(props.children, (child: React.ReactNode) => {
			return child;
		});
		props.callBack(arr);
		return arr;
	}

	return <React.Fragment>{show()}</React.Fragment>;
};

type ContentPropsType = {
	onResize?: () => void;
	class: string;
	style: any;
	ref: any;
};

const Content = React.forwardRef<HTMLDivElement, ContentPropsType>((props, ref): JSX.Element => {
	let store: React.ReactNode[];
	console.log("Render Content");

	const stateItems = useSelector((state: RootState) => state.items).arrayOfItems;
	const [PopUp, setPopUp] = useState<React.ReactNode>(null);

	const createDivElement: JSX.Element[] | string =
		stateItems?.map((elem): JSX.Element => {
			return (
				<div key={elem.id} className={styles.gridElem} data-modal={"popup" + elem.id}>
					<img
						className={styles.imgItem}
						src={"https://raw.githubusercontent.com/AzureBin/react-test/master/assets" + elem.image}
						alt='Изображение продукта'
						data-modal={"windowPopup"}
					/>
					<div className={styles.textBlock}>
						<h3 className={styles.text}>{elem.title} </h3>
						<h4 className={styles.text}>{"Brand" + " " + String(elem.brand)}</h4>
						<p className={styles.text}>{elem.regular_price.currency + " " + elem.regular_price.value}</p>
					</div>
					<input
						className={styles.input + " " + styles.text}
						type={"number"}
						min={0}
						max={999}
						step={1}
						placeholder={"Количество"}
						data-modal={"inputValue"}
					/>
					<button data-modal={"cartPopup"} className={styles.buttonCart}>
						<img
							className={styles.imgCart}
							src={shopping_cart}
							alt='Купить'
							title='Добавить в корзину'
							data-modal={"cartPopup"}
						/>
					</button>
				</div>
			);
		}) ?? "Нет записей в каталоге";

	function handlerOnClick(event: React.MouseEvent<HTMLDivElement>) {
		switch ((event.target as HTMLInputElement).dataset["modal"]) {
			case "cartPopup":
				break;
			case "windowPopup":
				onResizeCell(event);
				break;
			case "inputValue":
				break;
			default:
				if (PopUp) setPopUp(null);
				break;
		}
	}

	function onResizeCell(event: React.MouseEvent<HTMLDivElement>) {
		const word: string | undefined = (event.target as HTMLDivElement).closest("div")?.dataset["modal"]?.slice(5);
		if (word && !PopUp) {
			setPopUp(store[Number(word) - 1]);
		} else {
			setPopUp(null);
		}
	}

	function callBack(dataChild: React.ReactNode) {
		store = React.Children.toArray(dataChild);
	}

	return (
		<div className={props.class} style={props.style} ref={ref} onClick={handlerOnClick}>
			<ShowItems callBack={callBack}>{createDivElement}</ShowItems>
			{PopUp && <ModalWindow>{PopUp}</ModalWindow>}
		</div>
	);
});

export { Content };
