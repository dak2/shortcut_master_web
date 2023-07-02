import { useGoogleLogin } from '@react-oauth/google';

export default function LoginButton() {
  const login = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => sendToken(codeResponse.code),
    onError: errorResponse => console.log(errorResponse),
  });

  const sendToken = async (code: string) => {
    const login_url = process.env.NEXT_PUBLIC_API_URL + "/login";
    try {
      const response = await fetch(login_url, {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: btoa(code) }),
      });
      console.log(await response.json());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={() => login()}>
      Login with Google
    </button>
  );
}
