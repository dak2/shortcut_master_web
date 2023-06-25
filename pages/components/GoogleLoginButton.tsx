import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

export default function GoogleLoginButton() {
  const sendCredentials = async (credential: string) => {
    const login_url = process.env.NEXT_PUBLIC_API_URL + "/login";
    try {
      const response = await fetch(login_url, {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ credential: btoa(credential) }),
      });
      console.log(await response.json());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ""}
    >
      <GoogleLogin
        onSuccess={(credentialResponse) =>
          void sendCredentials(credentialResponse.credential ?? "")
        }
        onError={() => console.error("Login Failed")}
      />
    </GoogleOAuthProvider>
  );
}
