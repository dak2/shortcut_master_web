'use client';
import Link from 'next/link';
import { flex } from '../../../../../styled-system/patterns';
import { css } from '../../../../../styled-system/css';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { UserContext } from 'app/providers/UserProvider';
import { getCurrentUser } from 'app/utils/auth';

const containerCss = flex({
  justifyContent: 'center',
  marginTop: '15%',
});

const selectQuizContainerCss = css({
  marginRight: '10%',
  width: '15rem',
  padding: '4rem',
  textAlign: 'left',
  color: 'inherit',
  textDecoration: 'none',
  border: '1px solid #eaeaea',
  display: 'grid',
  placeItems: 'center',
  whiteSpace: 'wrap',
  transition: 'color 0.15s ease, border-color 0.15s ease',
  borderRadius: '45px',
  cursor: 'pointer',
  fontSize: '1.3rem',
  _hover: {
    color: '#0070f3',
    borderColor: '#0070f3',
  },
  _focus: {
    color: '#0070f3',
    borderColor: '#0070f3',
  },
  _active: {
    color: '#0070f3',
    borderColor: '#0070f3',
  },
});

const selectQuizAnalysisContainerCss = css({
  marginLeft: '10%',
  width: '15rem',
  padding: '4rem',
  textAlign: 'left',
  color: 'inherit',
  textDecoration: 'none',
  border: '1px solid #eaeaea',
  borderRadius: '45px',
  transition: 'color 0.15s ease, border-color 0.15s ease',
  display: 'grid',
  placeItems: 'center',
  cursor: 'pointer',
  fontSize: '1.3rem',
  _hover: {
    color: '#0070f3',
    borderColor: '#0070f3',
  },
  _focus: {
    color: '#0070f3',
    borderColor: '#0070f3',
  },
  _active: {
    color: '#0070f3',
    borderColor: '#0070f3',
  },
});

export default function Dashboard() {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const currentUser = getCurrentUser(user);

  useEffect(() => {
    if (!currentUser.name) {
      router.push('/');
    }
  }, []);

  return (
    <div className={containerCss}>
      <Link href="/quizzes" className={selectQuizContainerCss}>
        クイズを行う
      </Link>
      <Link href="/analysis" className={selectQuizAnalysisContainerCss}>
        前回までのクイズ結果を確認する
      </Link>
    </div>
  );
}
