import React, { MouseEvent } from "react";
import styles from "./aside.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState, TypeDispatch } from "../../../redux_state/state";
import { addFilterBrandsAction } from "../../../redux_state/brands";
import { CreateElement } from "../../create_element";

export let Aside: React.FC = () => {
	const stateBrands = useSelector((state: RootState) => state.brands);
	const brandsDispatch = useDispatch<TypeDispatch>();
	const list: JSX.Element[] | null =
		stateBrands.brands !== null
			? stateBrands.brands.map((elem): JSX.Element => {
					return (
						<CreateElement
							Tag={"li"}
							key={elem.id}
							data={{
								id: `${elem.title}`,
								className: stateBrands.filterIdBrands?.includes(elem.id)
									? `${styles.list}` + " " + `${styles.isListActive}`
									: `${styles.list}`,
							}}
						>
							{elem.title}
						</CreateElement>
					);
			  })
			: null;

	function handlerOnClick(event: MouseEvent<HTMLInputElement>) {
		const [label, id] = (event.target as HTMLInputElement).id.split(" ");

		if (label === "Brand" && stateBrands) {
			let temp: number[] | null = stateBrands.filterIdBrands ? stateBrands.filterIdBrands : [];
			const index: number = stateBrands.filterIdBrands ? stateBrands.filterIdBrands?.findIndex((elem) => elem === Number(id)) : -1;

			if (temp && index != -1) {
				temp.splice(index, 1);
				temp = temp.length ? temp : null;
			} else {
				temp.push(Number(id));
			}
			brandsDispatch(addFilterBrandsAction(temp));
		}
	}

	return (
		<div className={styles.block} onClick={handlerOnClick}>
			<h4 className={styles.title}>All Brands</h4>
			<ul className={styles.ul}>{stateBrands.brands !== null ? list : ""}</ul>
		</div>
	);
};
