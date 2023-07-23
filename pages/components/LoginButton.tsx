import { useGoogleLogin } from "@react-oauth/google";

export default function LoginButton() {
  const useLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: (codeResponse) => login(codeResponse.code),
    onError: (errorResponse) => { throw new Error(`Failed to login: ${errorResponse}. Please check your credentials and try again`) },
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

      if (!response.ok) {
        throw new Error("Network response was not ok. Please check your credentials and try again");
      }
      console.log(await response.json());
    } catch (error) {
      throw new Error(`Failed to login: ${error}. Please check your credentials and try again`);
    }
  };

  return <button onClick={() => useLogin()}>Login with Google</button>;
}
