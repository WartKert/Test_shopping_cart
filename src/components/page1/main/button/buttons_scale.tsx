import React from "react";
import styles from "./buttons_scale.module.css";
import maximize from "../../../../image/maximize.png";
import minimize from "../../../../image/minimize.png";

type ButtonsPropsType = {
	eventAddGrid: (e: any) => void;
	eventSubGrid: (e: any) => void;
};

let ButtonsScale: React.FC<ButtonsPropsType> = (props: ButtonsPropsType): JSX.Element => {
	return (
		<div className={styles.blockButton}>
			<div>
				<button className={styles.button} type='button' onClick={props.eventSubGrid}>
					<img src={minimize} alt='Уменьшить' title='Уменьшить' />
				</button>
			</div>
			<div>
				<button className={styles.button} type='button' onClick={props.eventAddGrid}>
					<img src={maximize} alt='Увеличить' title='Увеличить' />
				</button>
			</div>
		</div>
	);
};

export { ButtonsScale };
