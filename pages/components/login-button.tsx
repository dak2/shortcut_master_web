import { useContext } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { User, UserContext } from "../user-provider";
import { useRouter } from "next/router";

export default function LoginButton() {
  const { setUser } = useContext(UserContext);
  const router = useRouter();

  const useLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: (codeResponse) => login(codeResponse.code),
    onError: (errorResponse) => {
      throw new Error(
        `Failed to login: ${errorResponse}. Please check your credentials and try again`
      );
    },
  });

  const login = async (code: string) => {
    const login_url = process.env.NEXT_PUBLIC_API_URL + "/login";
    try {
      const response = await fetch(login_url, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: btoa(code) }),
      });

      if (response.ok) {
        const data = await response.json();
        const user: User = {
          name: data,
        };
        setUser(user);
        localStorage.setItem("user", user.name ?? "");
        router.push("/home");
      } else {
        throw new Error(
          "Network response was not ok. Please check your credentials and try again"
        );
      }
    } catch (error) {
      throw new Error(
        `Failed to login: ${error}. Please check your credentials and try again`
      );
    }
  };

  return <button onClick={() => useLogin()}>Login with Google</button>;
}
