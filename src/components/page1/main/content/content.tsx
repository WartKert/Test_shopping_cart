import React, {
	ChangeEvent,
	ChangeEventHandler,
	Dispatch,
	useState,
	MouseEvent,
	CSSProperties,
	ElementType,
	HTMLAttributes,
	ImgHTMLAttributes,
	ReactElement,
	PropsWithChildren,
} from "react";
import styles from "./content.module.css";
import { useSelector } from "react-redux";
import { ActionsTypes, RootState, TypeDispatch } from "../../../../redux_state/state";
import { ModalWindow } from "./modal_window";
import shopping_cart from "../../../../image/shopping-cart.png";
import { useDispatch } from "react-redux";
import {
	addItemToShopAction,
	selectItemAction,
	SelectItemType,
	ValuesColorType,
	ValuesSizeType,
	VariantsType,
} from "../../../../redux_state/items";
import { CreateCell } from "./create_cell";
import { CreateElement } from "../../../create_element";
import { type } from "os";

type ContentPropsType = {
	onResize?: () => void;
	class: string;
	style: any;
	ref: any;
};

let df: JSX.IntrinsicElements;

const Content = React.forwardRef<HTMLDivElement, ContentPropsType>((props, ref): JSX.Element => {
	let store: React.ReactNode[];
	console.log("Render Content");

	const stateItems = useSelector((state: RootState) => state.items).arrayOfItems;
	const ItemDispatch = useDispatch<TypeDispatch>();
	const [PopUp, setPopUp] = useState<React.ReactNode>(null);
	// const [selectColor, setselectColor] = useState<{ [key: number]: number }>();
	// const [selectSize, setselectSize] = useState<{ [key: number]: number }>();

	// roperty) JSX.IntrinsicElements.img: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
	// const createDivElement: JSX.Element[] | string =
	// 	stateItems?.map((elem): JSX.Element => {
	// function extract(elem: ListItemsFromServerType, num: number): JSX.Element {
	// 	const option = elem.configurable_options?.[num];

	// 	if (option) {
	// 		return (
	// 			<React.Fragment>
	// 				{Object.values(option.values).map(
	// 					(subElem: { label: string; value_index: number; value: string | number }, index: number) => {
	// 						if (changeColor.id && elem.id != changeColor.id) {
	// 							return (
	// 								<React.Fragment>
	// 									<div className={styles.blockOptions + " " + styles.isBlockOptions}></div>
	// 								</React.Fragment>
	// 							);
	// 						} else {
	// 						}

	// 						return (
	// 							<div className={styles.blockOptions}>
	// 								<label
	// 									htmlFor={option.label + " " + subElem.label + " " + subElem.value_index}
	// 									style={
	// 										option.label === "Color"
	// 											? { ["backgroundColor"]: `${subElem.value}`, ["color"]: "transparent" }
	// 											: {}
	// 									}
	// 									className={styles.label}
	// 								>
	// 									<span>{option.label === "Color" ? "00" : subElem.label}</span>
	// 								</label>
	// 								<input
	// 									type={"checkbox"}
	// 									className={styles.check}
	// 									id={option.label + " " + subElem.label + " " + subElem.value_index}
	// 									data-check={option.label}
	// 								/>
	// 							</div>
	// 						);
	// 					}
	// 				)}
	// 			</React.Fragment>
	// 		);
	// 	} else return <React.Fragment></React.Fragment>;
	// }

	// 	return (

	// 			{/* <div className={styles.selectColor}>{extract(elem, 0)} </div>
	// 			<div className={styles.selectSize}>{extract(elem, 1)}</div> */}

	// ) ?? "Нет записей в каталоге";

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
				searchVariant(event.target as HTMLDivElement);
				break;

			default:
				if (PopUp) setPopUp(null);
				break;
		}
	}

	function name(label: string, colorId: string, id: string) {
		// debugger;
		let itemObj = stateItems?.find((elem) => elem.id === Number(id));

		if (itemObj) {
			let findSelected: VariantsType[] | null;
			var findSelectItem: typeof itemObj.selectItem;
			const i: number = label === "Color" ? 0 : 1;
			let property;

			if (itemObj.selectItem.Color || itemObj.selectItem.Size) {
				if (itemObj.selectItem[label as keyof typeof itemObj.selectItem] !== Number(colorId)) {
					findSelected = itemObj.selected!.filter((elem) => elem.attributes[i].value_index === Number(colorId));
					property = label === "Color" ? { Color: Number(colorId) } : { Size: Number(colorId) };
				} else {
					findSelected = null;
					property = { Color: null, Size: null };
				}
			} else {
				findSelected = Object.values(itemObj?.variants as { [key: number]: VariantsType }).filter(
					(elem) => elem.attributes[i].value_index === Number(colorId)
				);
				property = label === "Color" ? { Color: Number(colorId) } : { Size: Number(colorId) };
			}

			findSelectItem = {
				...itemObj.selectItem,
				...property,
			};
			ItemDispatch(selectItemAction(Number(id), findSelected, findSelectItem));
		}
	}

	function searchVariant(elem: HTMLDivElement) {
		let [label, colorId, id] = elem.id.split(" ");

		switch (label) {
			case "Color":
				name(label, colorId, id);
				break;
			case "Size":
				name(label, colorId, id);
				break;

			default:
				break;
		}
	}

	function handlerOnChange(event: ChangeEvent<HTMLInputElement>) {
		debugger;
		const elem = event.target;
		switch (elem.dataset["check"]) {
			case "inputValue":
				break;

			default:
				break;
		}

		function searchItem(num: number) {
			// stateItems[num];
		}

		const word: string | undefined = event.target.closest("div")?.dataset["modal"];
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

	function editOption(child: React.ReactNode, ...otherData: any[]): React.ReactNode {
		type ChildType = {
			props: {
				id: string;
				className: string;
			};
		};

		let [label, curValueIndex, id] = (child as ChildType).props.id.split(" ");
		let obj = stateItems?.find((elem) => elem.id === Number(id));
		if (!obj?.selected) return child;
		else {
			let tempChild: React.ReactNode;

			for (const iterator of obj.selected) {
				const valIndex = label === "Color" ? iterator.attributes[0].value_index : iterator.attributes[1].value_index;

				if (valIndex === Number(curValueIndex)) {
					tempChild = child;
					break;
				}

				tempChild = React.cloneElement(
					child as ReactElement<PropsWithChildren<{ className: string; style: { ["backgroundColor"]: string } }>>,
					{
						className: `${(child as ChildType).props.className}` + " " + `${styles.isSelected}`,
						style: { ["backgroundColor"]: "gray" },
					}
				);
			}
			return tempChild;
		}
	}

	return (
		<div className={props.class} style={props.style} ref={ref} onClick={handlerOnClick} onChange={handlerOnChange}>
			<CreateCell callBack={callBack}>
				{stateItems?.map((elem) => {
					return (
						<CreateElement
							Tag={"div"}
							key={elem.id}
							data={{
								id: `${elem.id}`,
								className: `${styles.gridElem}`,
								["data-modal"]: `${"popup" + elem.id}`,
							}}
						>
							<CreateElement
								Tag={"img"}
								data={{
									className: `${styles.imgItem}`,
									src: "https://raw.githubusercontent.com/AzureBin/react-test/master/assets" + `${elem.image}`,
									alt: "Изображение продукта",
									["data-modal"]: "windowPopup",
								}}
							/>
							<CreateElement
								Tag={"div"}
								data={{
									tag: "div",
									className: `${styles.textBlock}`,
									["data-modal"]: "skip",
								}}
							>
								<h3 className={styles.text} data-modal={"skip"}>
									{elem.title}{" "}
								</h3>
								<h4 className={styles.text} data-modal={"skip"}>
									{"Brand" + " " + String(elem.brand)}
								</h4>
								<p className={styles.text} data-modal={"skip"}>
									{elem.regular_price.currency + " " + elem.regular_price.value}
								</p>
							</CreateElement>
							<CreateElement
								Tag={"div"}
								data={{
									className: `${styles.selectColor}`,
								}}
								otherData={elem.selected}
								funcEdit={editOption}
							>
								{elem.configurable_options
									? Object.values(elem.configurable_options[0].values).map(
											(subElem: { label: string; value_index: number; value: string }) => {
												return (
													<div
														className={styles.blockOptions}
														style={{ ["backgroundColor"]: `${subElem.value}` }}
														data-modal='select'
														id={
															`${elem.configurable_options![0].label}` +
															" " +
															`${subElem.value_index}` +
															` ` +
															`${elem.id}`
														}
													>
														11
													</div>
												);
											}
									  )
									: null}
							</CreateElement>

							<CreateElement
								Tag={"div"}
								data={{
									className: `${styles.selectSize}`,
								}}
								otherData={elem.selected}
								funcEdit={editOption}
							>
								{elem.configurable_options
									? Object.values(elem.configurable_options[1].values).map(
											(subElem: { label: string; value_index: number; value: number }) => {
												return (
													<div
														className={styles.blockOptions}
														data-modal='select'
														id={
															`${elem.configurable_options![1].label}` +
															" " +
															`${subElem.value_index}` +
															` ` +
															`${elem.id}`
														}
													>{`${subElem.label}`}</div>
												);
											}
									  )
									: null}
							</CreateElement>

							<CreateElement
								Tag={"input"}
								data={{
									className: `${styles.input + " " + styles.text}`,
									type: "number",
									min: 0,
									max: 999,
									step: 1,
									placeholder: "Количество",
									["data-modal"]: "skip",
									["data-check"]: "inputValue",
								}}
							/>

							<CreateElement
								Tag={"button"}
								data={{
									className: `${styles.buttonCart}`,
									["data-modal"]: "addItemToCart",
								}}
							>
								<CreateElement
									style={styles.test}
									Tag={"img"}
									data={{
										className: `${styles.imgCart}`,
										src: `${shopping_cart}`,
										alt: "Купить",
										title: "Добавить в корзину",
										["data-modal"]: "cartPopup",
									}}
								/>
							</CreateElement>
						</CreateElement>
					);
				}) ?? <p>"Нет записей в каталоге"</p>}
			</CreateCell>

			{PopUp && <ModalWindow>{PopUp}</ModalWindow>}
		</div>
	);
});

export { Content };

// function extract(elem: ListItemsFromServerType, num: number, callBack: (elem: ListItemsFromServerType) => void): JSX.Element {
// 			const option = elem.configurable_options?.[num];

// 			if (option) {
// 				return (
// 					<React.Fragment>
// 						{Object.values(option.values).map(
// 							(subElem: { label: string; value_index: number; value: string | number }, index: number) => {
// 								if (changeColor.id && elem.id != changeColor.id) {
// 									return (
// 										<React.Fragment>
// 											<div className={styles.blockOptions + " " + styles.isBlockOptions}></div>
// 										</React.Fragment>
// 									);
// 								} else {
// 								}

// 								return (
// 									<div className={styles.blockOptions}>
// 										<label
// 											htmlFor={option.label + " " + subElem.label + " " + subElem.value_index}
// 											style={
// 												option.label === "Color"
// 													? { ["backgroundColor"]: `${subElem.value}`, ["color"]: "transparent" }
// 													: {}
// 											}
// 											className={styles.label}
// 										>
// 											<span>{option.label === "Color" ? "00" : subElem.label}</span>
// 										</label>
// 										<input
// 											type={"checkbox"}
// 											className={styles.check}
// 											id={option.label + " " + subElem.label + " " + subElem.value_index}
// 											data-check={option.label}
// 										/>
// 									</div>
// 								);
// 							}
// 						)}
// 					</React.Fragment>
// 				);
// 			} else return <React.Fragment></React.Fragment>;
// 		}
