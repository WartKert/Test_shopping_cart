import React, { useEffect, useRef, useState } from "react";
import styles from "./catalog.module.css";
import { useSelector } from "react-redux";
import { AppStateType, RootState } from "../../redux_state/state";
import { ButtonsScale } from "./catalog/button/buttons_scale";
import { Content } from "./catalog/content/content";

let curNumCol: number;

type StyleGridType = {
	display: "grid";
	["gridTemplate"]: string;
	["gap"]: string;
};

export let Catalog: React.FC = (): JSX.Element => {
	console.log("Render Catalog");
	const refDivBLock = useRef<HTMLDivElement>(null);
	const stateItems = useSelector((state: RootState) => state.items.arrayOfItems);
	const [styleGrid, setStyleGrid] = useState<StyleGridType>();

	const onAddCell = (e: any) => {
		console.log("add");
		setStyleGrid(calcStylesGrid(--curNumCol, refDivBLock));
		console.log("curNumCol = ", curNumCol);
	};
	const onSubCell = (e: any) => {
		console.log("sub");
		setStyleGrid(calcStylesGrid(++curNumCol, refDivBLock));
		console.log("curNumCol = ", curNumCol);
	};

	useEffect(() => {
		curNumCol = 4;
		setStyleGrid(calcStylesGrid(curNumCol, refDivBLock));
	}, []);

	function calcStylesGrid(curNumCol: number, elem: React.RefObject<HTMLElement>): StyleGridType {
		const sizeElem: DOMRect | undefined = elem.current?.getBoundingClientRect();
		const sizeGap: number = Math.max(60 - (curNumCol - 1) * 10, 20);

		const calcWidthCol = (): string => {
			const widthCol: number = (sizeElem!.width ?? null) / curNumCol - sizeGap * (curNumCol - 1);
			const heightCol: number = widthCol + 150;
			const sumNumCell: number = stateItems?.length ?? 0;

			let wordRow: string = "";
			let wordCol: string = "";

			for (let i = 0; i < sumNumCell / curNumCol; i++) {
				wordRow = wordRow.concat(`${heightCol}px `);
			}
			for (let i = 0; i < curNumCol; i++) {
				wordCol = wordCol.concat(`1fr `);
			}
			return wordRow + "/" + wordCol;
		};
		return {
			display: "grid",
			["gridTemplate"]: `${calcWidthCol()}`,
			["gap"]: `${sizeGap}px ${sizeGap}px`,
		};
	}

	return (
		<React.Fragment>
			<div className={styles.blockScale}>
				<ButtonsScale eventAddGrid={onAddCell} eventSubGrid={onSubCell} />
			</div>
			<h2 className={styles.row}>Catalog</h2>
			{/* <div className={styles.blockCatalog} style={styleGrid} ref={refDivBLock} onClick={}> */}
			<Content class={styles.blockCatalog} style={styleGrid} ref={refDivBLock} />
			{/* </div> */}
		</React.Fragment>
	);
};
