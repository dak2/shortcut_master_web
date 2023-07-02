import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import LoginButton from "./LoginButton";

export default function GoogleLoginButton() {
  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ""}
    >
      <LoginButton />
    </GoogleOAuthProvider>
  );
}
