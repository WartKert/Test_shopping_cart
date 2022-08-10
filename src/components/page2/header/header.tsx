import React from "react";
import imgLogo from "../../../image/logo.png";
import styles from "./header.module.css";
import { Link } from "react-router-dom";

export const Header: React.FC = (): JSX.Element => {
	return (
		<div className={styles.imageBlock}>
			<Link to='/' className={styles.image}>
				<img src={imgLogo} alt='Logo' title='Logo' />
			</Link>
		</div>
	);
};
