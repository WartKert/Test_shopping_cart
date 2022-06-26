import React, { FC, FunctionComponent } from "react";
import styles from "./aside.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux_state/state";
import { ListBrandsFromServerType } from "../../redux_state/brands";

type HeaderProps = {};

interface stateType {
	cntItem: number;
}

type propsType = {};

export let Aside: React.FC<propsType> = () => {
	const stateBrand = useSelector((state: RootState) => state.brands).arrayOfBrands;
	console.log("Aside rendered");
	const list: JSX.Element[] | null =
		stateBrand !== null
			? stateBrand.map((elem: ListBrandsFromServerType): JSX.Element => {
					return (
						<li key={elem.id} className={styles.list}>
							{elem.title}
						</li>
					);
			  })
			: null;

	return (
		<div className={styles.block}>
			<h4 className={styles.title}>All Brands</h4>
			<ul className={styles.ul}>{stateBrand !== null ? list : ""}</ul>
		</div>
	);
};
