import React from "react";
import styles from "./content.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux_state/state";
import { CreateElement } from "../../../create_element";
import delete_image from "../../../../image/delete.png";

const Content: React.FC = (): JSX.Element => {
	const stateShopping = useSelector((state: RootState) => state.shopping).items;
	let subtotal: number = 0;

	return (
		<React.Fragment>
			{stateShopping
				? Object.values(stateShopping).map((elem) => {
						subtotal = Number((subtotal + elem.numberOfItems * elem.regular_price.value).toFixed(2));
						return (
							<React.Fragment key={elem.product.id}>
								<CreateElement Tag={"div"} data={{ className: `${styles.bodyItem}` }}>
									<img
										src={
											"https://raw.githubusercontent.com/AzureBin/react-test/master/assets" + `${elem.product.image}`
										}
										alt='Изображение продукта'
										className={styles.imageProduct}
									/>
									<p className={styles.textItem}>
										Brand {elem.brand} / ID: {elem.product.id}{" "}
										{elem.product.sku.split("-")[1]
											? `Color: ${elem.product.sku.split("-")[1]} / Size: ${elem.product.sku
													.split("-")[2]
													.toUpperCase()}`
											: null}
									</p>
									<img
										src={delete_image}
										className={styles.imageDelete}
										alt='Удалить'
										title='Удалить позицию'
										id={`Delete ${elem.product.id}`}
									/>
								</CreateElement>

								<CreateElement Tag={"div"} data={{ className: `${styles.textDiv}` }}>
									<p className={styles.text}>{`${elem.regular_price.value} ${elem.regular_price.currency}`}</p>
								</CreateElement>

								<CreateElement Tag={"div"} data={{ className: `${styles.textDiv}` }}>
									<p className={styles.text}>{`${elem.numberOfItems}`}</p>
								</CreateElement>
								<CreateElement Tag={"div"} data={{ className: `${styles.textDiv}` }}>
									<p className={styles.text}>{`${(elem.regular_price.value * elem.numberOfItems).toFixed(2)} ${
										elem.regular_price.currency
									}`}</p>
								</CreateElement>
							</React.Fragment>
						);
				  })
				: null}
			<div className={styles.textDiv}></div>
			<div className={styles.textDiv}></div>
			<div className={styles.textDiv + " " + styles.subtotalDiv}>
				<p>Subtotal:</p>
			</div>
			<div className={styles.textDiv + " " + styles.subtotalDiv}>
				<p>{subtotal} USD</p>
			</div>
		</React.Fragment>
	);
};

export { Content };
