import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginButton from "./LoginButton";

export default function GoogleLogin() {
  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ""}
    >
      <LoginButton />
    </GoogleOAuthProvider>
  );
}
