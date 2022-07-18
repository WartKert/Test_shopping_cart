import React, { ChangeEvent, ChangeEventHandler, Dispatch, useState, MouseEvent, CSSProperties } from "react";
import styles from "./content.module.css";
import { useSelector } from "react-redux";
import { ActionsTypes, RootState, TypeDispatch } from "../../../../redux_state/state";
import { ModalWindow } from "./modal_window";
import shopping_cart from "../../../../image/shopping-cart.png";
import { useDispatch } from "react-redux";
import { addItemToShopAction, ListItemsFromServerType, ValuesColorType, ValuesSizeType } from "../../../../redux_state/items";

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
	const addItemDispatch = useDispatch<TypeDispatch>();
	const [PopUp, setPopUp] = useState<React.ReactNode>(null);

	const createDivElement: JSX.Element[] | string =
		stateItems?.map((elem): JSX.Element => {
			function extract(elem: ListItemsFromServerType, num: number): JSX.Element {
				const option = elem.configurable_options?.[num];

				if (option) {
					return (
						<React.Fragment>
							{Object.values(option.values).map((subElem: { label: string; value_index: number; value: string | number }) => {
								return (
									<div className={styles.blockOptions}>
										<label
											htmlFor={option.label + " " + subElem.label + " " + subElem.value_index}
											style={
												option.label === "Color"
													? { ["backgroundColor"]: `${subElem.value}`, ["color"]: "transparent" }
													: {}
											}
											className={styles.label}
										>
											<span>{option.label === "Color" ? "00" : subElem.label}</span>
										</label>
										<input
											type={"checkbox"}
											className={styles.check}
											id={option.label + " " + subElem.label + " " + subElem.value_index}
											data-check={option.label}
										/>
									</div>
								);
							})}
						</React.Fragment>
					);
				} else return <React.Fragment></React.Fragment>;
			}

			return (
				<div key={elem.id} className={styles.gridElem} data-modal={"popup" + elem.id}>
					<img
						className={styles.imgItem}
						src={"https://raw.githubusercontent.com/AzureBin/react-test/master/assets" + elem.image}
						alt='Изображение продукта'
						data-modal={"windowPopup"}
					/>
					<div className={styles.textBlock} data-modal={"skip"}>
						<h3 className={styles.text} data-modal={"skip"}>
							{elem.title}{" "}
						</h3>
						<h4 className={styles.text} data-modal={"skip"}>
							{"Brand" + " " + String(elem.brand)}
						</h4>
						<p className={styles.text} data-modal={"skip"}>
							{elem.regular_price.currency + " " + elem.regular_price.value}
						</p>
					</div>
					<div className={styles.selectColor}>{extract(elem, 0)} </div>
					<div className={styles.selectSize}>{extract(elem, 1)}</div>

					<input
						className={styles.input + " " + styles.text}
						type={"number"}
						min={0}
						max={999}
						step={1}
						placeholder={"Количество"}
						data-modal={"skip"}
						data-check={"inputValue"}
					/>
					<button data-modal={"addItemToCart"} className={styles.buttonCart}>
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

	function handlerOnClick(event: MouseEvent<HTMLInputElement>) {
		switch ((event.target as HTMLInputElement).dataset["modal"]) {
			case "addItemToCart":
				onAddToShoppingCart(event);
				break;
			case "windowPopup":
				onResizeCell(event);
				break;
			case "inputValue":
				break;
			case "skip":
				break;
			case "select":
				break;

			default:
				if (PopUp) setPopUp(null);
				break;
		}
	}

	function searchVariant(elemId: EventTarget) {}

	function handlerOnChange(event: ChangeEvent<HTMLInputElement>) {
		debugger;
		const elem = event.target;
		switch (elem.dataset["check"]) {
			case "inputValue":
				break;
			case "Color":
				searchVariant(elem);
				break;
			case "Size":
				break;

			default:
				break;
		}

		function searchItem(num: number) {
			// stateItems[num];
		}

		const word: string | undefined = event.target.closest("div")?.dataset["modal"];
		if (word) {
			addItemDispatch(addItemToShopAction("item", Number(event.target.value)));
		}
	}

	function onAddToShoppingCart(event: React.MouseEvent<HTMLInputElement>) {
		const word: string | undefined = (event.target as HTMLDivElement).closest("div")?.dataset["modal"]?.slice(5);
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
		<div className={props.class} style={props.style} ref={ref} onClick={handlerOnClick} onChange={handlerOnChange}>
			<ShowItems callBack={callBack}>{createDivElement}</ShowItems>
			{PopUp && <ModalWindow>{PopUp}</ModalWindow>}
		</div>
	);
});

export { Content };
