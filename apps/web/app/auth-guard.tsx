import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import { isLoggedIn } from "./actions";

export const AuthGuard = async (props: PropsWithChildren) => {
  if (await isLoggedIn()) return props.children;
  // unauthorized
  return redirect("/");
};
