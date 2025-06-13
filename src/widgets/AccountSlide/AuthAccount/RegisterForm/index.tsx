"use client";

// imports ================================================== //
import AuthForm from "@/entities/AuthForm";
import VisiblePasswordInputForm from "@/features/VisiblePasswordInputForm";
import { useState } from "react";
import type { InvalidEvent, FormEvent } from "react";
import { CustomRegisterForm } from "./types";
import getErrorMessageByStatusCode from "./helper";
import WrongMessage from "@/features/WrongMessage";
import InputForm, { validationInput } from "@/shared/ui/InputForm";
import getUserData from "../api";
import { useAppDispatch } from "@/app/store/hooks";
import { setUser } from "@/app/store/slices/user";

// main ===================================================== //
const RegisterForm = () => {

	const [wrongMessage, setWrongMessage] = useState<string | null>(null);
	const [passwordValue, setPasswordValue] = useState("");

	const dispatch = useAppDispatch();

	async function handleSubmit(event: FormEvent<CustomRegisterForm>) {

		event.preventDefault();

		const { email, password, confirm_password } = event.currentTarget.elements;

		if (email && password && confirm_password) {

			const response = await fetch("/register/api", {
				method: "POST",
				headers: {
					"Content-Type": "Application/json"
				},
				body: JSON.stringify({
					email: email.value,
					password: password.value
				})
			});

			if (response.ok) {
				dispatch(setUser(await getUserData()));
			} else {
				setWrongMessage(
					getErrorMessageByStatusCode(response.status)
				);
			}

		}

	}
	function handleFocus() {
		if (wrongMessage) setWrongMessage(null);
	}

	return (
		<>
			{
				wrongMessage &&
				<WrongMessage
					close={() => setWrongMessage(null)}
					text={wrongMessage}
				/>
			}
			<AuthForm
				name="Создание аккаунта"
				onSubmit={handleSubmit}
				onFocus={handleFocus}
			>
				<InputForm
					description="Электронная почта"
					placeholder="Введите адрес электронной почты, привязанной к аккаунту"
					name="email"
					type="email"
					required
				/>
				<InputForm
					description="Пароль"
					placeholder="Введите пароль для будущего аккаунта"
					name="password"
					type="password"
					isClear={wrongMessage !== null}
					pattern={validationInput.password.pattern}
					onChange={(event: any) => setPasswordValue(event.target.value)}
					onInvalid={(event: InvalidEvent<HTMLInputElement>) => {
						event.target.setCustomValidity(validationInput.password.message);
					}}
					required
				>
					<VisiblePasswordInputForm />
				</InputForm>
				<InputForm
					description="Подтверждение пароля"
					placeholder="Введите ранее набранный пароль для подтверждения"
					name="confirm_password"
					pattern={passwordValue}
					type="password"
					isClear={wrongMessage !== null}
					onInvalid={(event: InvalidEvent<HTMLInputElement>) => {
						event.target.setCustomValidity("Пароль не соответствует вышеуказанному паролю");
					}}
					required
				>
					<VisiblePasswordInputForm />
				</InputForm>
			</AuthForm>
		</>

	);

};

// export =================================================== //
export default RegisterForm;
