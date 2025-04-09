"use client";
import { LoginForm } from "@egen/ui/loginForm";
import { Ninja } from "@egen/ui/ninja";
import { SignupForm } from "@egen/ui/signupForm";
import { Overlay } from "@egen/ui/overlay";
import { Scene } from "@egen/ui/scene";
import { useCallback, useEffect, useState } from "react";
import { getProtectedContent, isLoggedIn, login, signup } from "./actions";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const NOT_ACTIVE_FORM = { id: "", error: null, loading: false };

function Home() {
  const [activeForm, setActiveForm] = useState(NOT_ACTIVE_FORM);
  const router = useRouter();

  const close = useCallback(() => {
    setActiveForm(NOT_ACTIVE_FORM);
  }, []);

  useEffect(() => {
    isLoggedIn().then((logged) => {
      if (logged) {
        router.push("/protected");
      }
    });
  }, []);

  const updateState = (fn: Function) => {
    return async (...args: any) => {
      setActiveForm((pre) => ({ ...pre, loading: true }));
      const res = await fn(...args);
      if (res.error) {
        setActiveForm((pre) => ({
          ...pre,
          error: res.error,
          loading: false,
        }));
      } else {
        setActiveForm((pre) => ({ ...pre, loading: false }));
      }
    };
  };

  return (
    <>
      <Scene
        dispatch={(id) => setActiveForm({ id, error: null, loading: false })}
      />
      <Overlay open={activeForm.id === "login"} onClose={close}>
        <LoginForm
          onSubmit={updateState(login)}
          error={activeForm.error}
          loading={activeForm.loading}
        />
      </Overlay>
      <Overlay open={activeForm.id === "signup"} onClose={close}>
        <SignupForm
          onSubmit={updateState(signup)}
          error={activeForm.error}
          loading={activeForm.loading}
        />
      </Overlay>
      <Ninja onHit={getProtectedContent} />
    </>
  );
}

export default dynamic(() => Promise.resolve(Home), { ssr: false });
