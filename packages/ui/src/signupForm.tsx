"use client";

import { FormEvent, useCallback, useState } from "react";
import { validate, Valid } from "@egen/validation";

interface Props {
  onSubmit: (email: string, username: string, password: string) => void;
  error: string | null;
  loading?: boolean;
}

export const SignupForm = (props: Props) => {
  const [validation, setValidation] = useState({
    valid: true,
    email: Valid,
    password: Valid,
    name: Valid,
  });

  const onSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const { email, password, username } = form;
    const vEmail = validate.email(email.value);
    const vPassword = validate.password(password.value);
    const vUsername = validate.username(username.value);
    const valid = vEmail.valid && vPassword.valid;
    setValidation({
      valid,
      email: vEmail,
      password: vPassword,
      name: vUsername,
    });
    if (valid) {
      props.onSubmit(email.value, username.value, password.value);
    }
  }, []);

  return (
    <form onSubmit={onSubmit}>
      <header>Signup</header>
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
          Name *
          <input name="username" placeholder="" />
          {validation.name.valid === false ? (
            <p className="v-error">{validation.name.message}</p>
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
          Signup
        </button>
      </fieldset>
    </form>
  );
};
