import React, { useEffect, useRef, useState } from "react";
import styles from "./catalog.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux_state/state";
import { ButtonsScale } from "./catalog/button/buttons_scale";
import { Content } from "./catalog/content/content";

let curNumCol: number;

type StyleGridType = {
	display: "grid";
	["gridTemplate"]: string;
	["gap"]: string;
	["font-size"]: string;
};

export let Catalog: React.FC = (): JSX.Element => {
	console.log("Render Catalog");
	const refDivBLock = useRef<HTMLDivElement>(null);
	const stateItems = useSelector((state: RootState) => state.items.arrayOfItems);
	const [styleGrid, setStyleGrid] = useState<StyleGridType>();

	const onAddCell = (e: any) => {
		if (curNumCol > 1) setStyleGrid(calcStylesGrid(--curNumCol, refDivBLock));
	};
	const onSubCell = (e: any) => {
		if (curNumCol < 5) setStyleGrid(calcStylesGrid(++curNumCol, refDivBLock));
	};

	function onResizeWindow() {
		setStyleGrid(calcStylesGrid(curNumCol, refDivBLock));
	}

	useEffect(() => {
		curNumCol = 4;
		setStyleGrid(calcStylesGrid(curNumCol, refDivBLock));
		window.addEventListener("resize", onResizeWindow);
		return () => window.removeEventListener("resize", onResizeWindow);
	}, []);

	function calcStylesGrid(curNumCol: number, elem: React.RefObject<HTMLElement>): StyleGridType {
		const sizeElem: DOMRect | undefined = elem.current?.getBoundingClientRect();
		const sizeGap: number = Math.max(60 - (curNumCol - 1) * 10, 20);
		const widthCol: number = (sizeElem!.width ?? null) / curNumCol - sizeGap * (curNumCol - 1);

		const calcWidthCol = (): string => {
			const sumNumCell: number = stateItems?.length ?? 0;

			let wordRow: string = "";
			let wordCol: string = "";

			wordRow = "auto";

			for (let i = 0; i < curNumCol; i++) {
				wordCol = wordCol.concat(`1fr `);
			}
			return wordRow + "/" + wordCol;
		};

		return {
			display: "grid",
			["gridTemplate"]: `${calcWidthCol()}`,
			["gap"]: `${sizeGap}px ${sizeGap}px`,
			["font-size"]: `${widthCol < 70 ? "10px" : widthCol < 90 ? "14px" : widthCol < 110 ? "15px" : "16px"}`,
		};
	}

	return (
		<React.Fragment>
			<div className={styles.blockScale}>
				<ButtonsScale eventAddGrid={onAddCell} eventSubGrid={onSubCell} />
			</div>
			<h2 className={styles.row}>Catalog</h2>
			<Content class={styles.blockCatalog} style={styleGrid} ref={refDivBLock} />
		</React.Fragment>
	);
};
