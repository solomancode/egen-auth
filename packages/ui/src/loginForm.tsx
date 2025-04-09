"use client";

import { FormEvent, useCallback, useState } from "react";
import { validate, Valid } from "@egen/validation";

interface Props {
	onSubmit: (email: string, password: string) => void;
	error: string | null;
	loading: boolean;
}

export const LoginForm = (props: Props) => {
	const [validation, setValidation] = useState({
		valid: true,
		email: Valid,
		password: Valid,
	});

	const onSubmit = useCallback((e: FormEvent) => {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const { email, password } = form;
		const vEmail = validate.email(email.value);
		const vPassword = validate.password(password.value);
		const valid = vEmail.valid && vPassword.valid;
		setValidation({
			valid,
			email: vEmail,
			password: vPassword,
		});
		if (valid) {
			props.onSubmit(email.value, password.value);
		}
	}, []);

	return (
		<form onSubmit={onSubmit}>
			<header>Welcome Back</header>
			{props.error ? <p className="v-error">{props.error}</p> : null}
			<fieldset>
				<label>
					Email *
					<input name="email" placeholder="" />
					{validation.email.valid === false ? (
						<p className="v-error">{validation.email.message}</p>
					) : null}
				</label>
				<label>
					Password *
					<input type="password" name="password" placeholder="" />
					{validation.password.valid === false ? (
						<p className="v-error">{validation.password.message}</p>
					) : null}
				</label>
				<button
					disabled={props.loading}
					className={"btn-primary " + (props.loading ? "loading" : "")}
				>
					Login
				</button>
			</fieldset>
		</form>
	);
};
