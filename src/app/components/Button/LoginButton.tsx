'use client';
import { useGoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { User, UserContext } from 'app/providers/UserProvider';
import { css } from '../../../../styled-system/css';

const loginButtonCss = css({
  textAlign: 'center',
  verticalAlign: 'middle',
  textDecoration: 'none',
  padding: '1rem 4rem',
  fontWeight: 'bold',
  borderRadius: '100vh',
  borderBottom: '7px solid #D68910',
  background: '#F39C12',
  color: '#fff',
  cursor: 'pointer',
  _hover: {
    marginTop: '1px',
    borderBottom: '1px solid #F39C12',
    color: '#fff',
  },
});

export default function LoginButton() {
  const { setUser } = useContext(UserContext);
  const router = useRouter();

  const useLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: (codeResponse) => login(codeResponse.code),
    onError: (errorResponse) => {
      throw new Error(`Failed to login: ${errorResponse}. Please check your credentials and try again`);
    },
  });

  const login = async (code: string) => {
    const login_url = process.env.NEXT_PUBLIC_API_URL + '/login';
    try {
      const response = await fetch(login_url, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: btoa(code) }),
      });

      if (response.ok) {
        const data = await response.json();
        const user: User = {
          name: data,
        };
        setUser(user);
        localStorage.setItem('user_name', user.name ?? '');
        router.push('/dashboard');
      } else {
        throw new Error('Network response was not ok. Please check your credentials and try again');
      }
    } catch (error) {
      throw new Error(`Failed to login: ${error}. Please check your credentials and try again`);
    }
  };

  return (
    <button onClick={useLogin} className={loginButtonCss}>
      Login with Google
    </button>
  );
}
