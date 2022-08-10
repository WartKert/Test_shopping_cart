import React, { ChangeEvent, useState, MouseEvent, ReactElement, PropsWithChildren } from "react";
import styles from "./content.module.css";
import { useSelector } from "react-redux";
import { RootState, TypeDispatch } from "../../../../redux_state/state";
import shopping_cart from "../../../../image/shopping-cart.png";
import { useDispatch } from "react-redux";
import { changeValueItemAction, selectItemAction, VariantsType } from "../../../../redux_state/items";
import { CreateCell } from "./create_cell";
import { CreateElement } from "../../../create_element";
import { addItemToShoppingCartAction, ListShoppingCartType } from "../../../../redux_state/shopping_cart";

type ContentPropsType = {
	onResize?: () => void;
	class: string;
	style: any;
	ref: any;
};

const Content = React.forwardRef<HTMLDivElement, ContentPropsType>((props, ref): JSX.Element => {
	const stateItems = useSelector((state: RootState) => state.items).arrayOfItems;
	const stateFilter = useSelector((state: RootState) => state.brands);
	const stateShop = useSelector((state: RootState) => state.shopping);
	const ItemDispatch = useDispatch<TypeDispatch>();

	function handlerOnClick(event: MouseEvent<HTMLInputElement>) {
		switch ((event.target as HTMLInputElement).dataset["modal"]) {
			case "addItemToCart":
				onAddToShoppingCart(event.target as HTMLButtonElement);
				break;
			case "inputValue":
				break;
			case "skip":
				break;
			case "select":
				searchVariant(event.target as HTMLDivElement);
				break;
			default:
				break;
		}
	}

	function selectItem(label: string, colorId: string, id: string) {
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
				selectItem(label, colorId, id);
				break;
			case "Size":
				selectItem(label, colorId, id);
				break;

			default:
				break;
		}
	}

	function handlerOnChange(event: ChangeEvent<HTMLInputElement>) {
		const [label, id] = event.target.id.split(" ");
		switch (label) {
			case "Input":
				ItemDispatch(changeValueItemAction({ ["numberOfItems"]: Number(event.target.value), toId: Number(id) }));
				break;
			default:
				break;
		}
	}

	function onAddToShoppingCart(event: HTMLButtonElement) {
		const [, id] = event.id.split(" ");
		const objItem = stateItems?.find((elem) => elem.id === Number(id));
		if (
			objItem &&
			objItem.numberOfItems &&
			(objItem.type === "configurable" ? objItem.selectItem.Color && objItem.selectItem.Size : true)
		) {
			let cart: { items: ListShoppingCartType } = {
				items: {
					title: objItem.title,
					regular_price: { currency: objItem.regular_price.currency, value: objItem.regular_price.value },
					brand: objItem.brand,
					numberOfItems: objItem.numberOfItems,
					product: objItem.selected ? objItem.selected[0].product : { id: objItem.id, sku: objItem.sku, image: objItem.image },
				},
			};

			let index: number = stateShop.items
				? Object.values(stateShop.items).findIndex((elem) => elem.product.id === cart.items!.product.id)
				: -1;

			const arrayOut: ListShoppingCartType[] =
				index >= 0
					? Object.values(stateShop.items!).map((elem) => {
							return elem.product.id === cart.items.product.id
								? { ...elem, numberOfItems: cart.items!.numberOfItems + elem.numberOfItems }
								: elem;
					  })
					: stateShop.items
					? Object.values(stateShop.items).concat(Object.values(cart))
					: Object.values(cart); // }

			ItemDispatch(addItemToShoppingCartAction(arrayOut));
		}
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

					if (obj.selectItem[label as keyof typeof obj.selectItem] === Number(curValueIndex)) {
						tempChild = React.cloneElement(child as ReactElement<PropsWithChildren<{ className: string }>>, {
							className: `${(child as ChildType).props.className}` + " " + `${styles.isSelected}`,
						});
					}
					break;
				}

				tempChild = React.cloneElement(child as ReactElement<PropsWithChildren<{ className: string }>>, {
					className: `${(child as ChildType).props.className}` + " " + `${styles.isNotSelected}`,
				});
			}
			return tempChild;
		}
	}

	return (
		<div className={props.class} style={props.style} ref={ref} onClick={handlerOnClick} onChange={handlerOnChange}>
			<CreateCell>
				{stateItems?.map((elem) => {
					if (stateFilter.filterIdBrands) {
						if (!stateFilter.filterIdBrands.includes(elem.brand)) return null;
					}
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
									src:
										"https://raw.githubusercontent.com/AzureBin/react-test/master/assets" +
										`${
											elem.selectItem.Color && elem.selectItem.Size && elem.variants
												? `${
														Object.values(elem.variants).find(
															(subelem) =>
																subelem.attributes[0].value_index === elem.selectItem.Color &&
																subelem.attributes[1].value_index === elem.selectItem.Size
														)?.product.image
												  }`
												: `${elem.image}`
										}`,
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
														key={subElem.value_index}
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
														key={subElem.value_index}
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
									id: `Input ${elem.id}`,
									type: "number",
									min: 0,
									max: 999,
									step: 1,
									placeholder: "Количество",
									defaultValue: `${elem.numberOfItems}`,
									["data-modal"]: "skip",
								}}
							/>

							<CreateElement
								Tag={"button"}
								data={{
									className: `${styles.buttonCart}`,
									id: `Button ${elem.id}`,
									["data-modal"]: "addItemToCart",
								}}
							>
								<CreateElement
									style={styles.test}
									Tag={"img"}
									data={{
										className: `${styles.imgCart}`,
										id: `Button ${elem.id}`,
										src: `${shopping_cart}`,
										alt: "Купить",
										title: "Добавить в корзину",
										["data-modal"]: "addItemToCart",
									}}
								/>
							</CreateElement>
						</CreateElement>
					);
				}) ?? <p>"Нет записей в каталоге"</p>}
			</CreateCell>
		</div>
	);
});

export { Content };
