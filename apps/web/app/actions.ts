"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BASE_URL = "http:localhost:3100";
const session_id = "session";

const headers = {
  "Content-Type": "application/json",
};

export async function token(id: string, email: string): Promise<string> {
  const res = await fetch(BASE_URL + "/api/token", {
    method: "POST",
    headers,
    body: JSON.stringify({ id, email }),
  });
  if (res.status === 200) {
    const cookieStore = await cookies();
    const { token } = await res.json();
    cookieStore.set(session_id, token, { secure: true, httpOnly: true });
    return token;
  } else {
    throw { error: "Failed to create token" };
  }
}

export async function login(email: string, password: string) {
  const res = await fetch(BASE_URL + "/api/auth", {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password }),
  });
  if (res.status === 200) {
    const json = await res.json();
    try {
      await token(json.id, json.email);
    } catch (error) {
      return error;
    }
    redirect("/protected");
  } else if (res.status === 400) {
    const error = await res.json();
    return { error: error.message };
  } else if (res.status === 401) {
    const error = await res.json();
    return { error: error.message };
  } else {
    return { error: "Something went wrong" };
  }
}

export async function signup(email: string, name: string, password: string) {
  const res = await fetch(BASE_URL + "/api/signup", {
    method: "POST",
    headers,
    body: JSON.stringify({ email, name, password }),
  });
  const json = await res.json();
  if (res.status === 200) {
    await login(email, password);
    redirect("/protected");
  } else {
    return { error: json.message };
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(session_id);
  return true;
}

export async function isLoggedIn() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(session_id);
  if (!cookie) {
    return false;
  }
  const token = cookie.value;
  console.log("token found", token);
  const res = await fetch(BASE_URL + "/api/verify", {
    method: "POST",
    headers,
    body: JSON.stringify({ token }),
  });
  const isValidToken = await res.json();
  console.log("token valid", isValidToken);
  return isValidToken;
}

export async function getProtectedContent() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(session_id);
  const res = await fetch(BASE_URL + "/api/protected", {
    headers: {
      // TODO: auto-attach cookie to every request
      Cookie: `${session_id}=${cookie?.value}`,
    },
  });
  if (res.status === 200) {
    return await res.json();
  } else {
    return { error: "🔒 Unauthorized" };
  }
}
