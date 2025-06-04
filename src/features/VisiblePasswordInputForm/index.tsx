"use client";

// imports ================================================== //
import styles from "./index.module.css";
import { useState, useContext } from "react";
import type { MouseEventHandler } from "react";
import type { VisiblePasswordInput as VisiblePasswordInputType } from "./types";
import { InputFormContext } from "@/shared/ui/InputForm";
import Button from "@/shared/ui/Button";

// main ===================================================== //
const VisiblePasswordInputForm: VisiblePasswordInputType = ({ onClick }) => {

	const { InputRef, setInputProps } = useContext(InputFormContext);
	const [isVisible, setIsVisible] = useState(InputRef.current?.type === "password");

	const handleClick: MouseEventHandler = (event) => {
		if (onClick) onClick(event);
		setIsVisible(!isVisible);
		setInputProps({ type: isVisible ? "password" : "text" })
	}

	return (
		<button
			type="button"
			className={styles.button}
			onClick={handleClick}
		>
			<img
				src={`/icons/${isVisible ? "visibility" : "visibility_off"}.svg`}
				className={styles.icon}
			/>
		</button>
	);

};

// export =================================================== //
export default VisiblePasswordInputForm;
