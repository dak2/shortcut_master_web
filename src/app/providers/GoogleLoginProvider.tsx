'use client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LoginButton from 'app/components/Button/LoginButton';

export default function GoogleLoginProvider() {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ''}>
      <LoginButton />
    </GoogleOAuthProvider>
  );
}
