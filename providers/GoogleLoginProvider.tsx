import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginButton from "../components/elements/button/LoginButton";

export default function GoogleLoginProvider() {
  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ""}
    >
      <LoginButton />
    </GoogleOAuthProvider>
  );
}
