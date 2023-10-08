'use client';

import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { UserContext } from 'app/providers/UserProvider';
import { getCurrentUser } from 'app/utils/auth';
import Link from 'next/link';
import GenericIcon from 'app/components/Elements/GenericIcon';
import { flex } from '../../../../../styled-system/patterns/flex';
import { css } from '../../../../../styled-system/css';

type Props = {
  type: string;
};

const quizInfoContainerCss = flex({
  fontSize: '1.3rem',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  marginTop: '10%',
  flex: 1,
  '& div': {
    margin: '1rem 0',
  },
});

const cardCss = css({
  border: '1px solid #eaeaea',
  borderRadius: '45px',
  padding: '2.5rem 4rem 2.5rem 4rem',
});

const startButtonCss = css({
  textAlign: 'center',
  verticalAlign: 'middle',
  textDecoration: 'none',
  padding: '0.8rem 3.5rem',
  fontWeight: 'bold',
  borderRadius: '100vh',
  background: '#F39C12',
  color: '#fff',
  cursor: 'pointer',
});

const textContainerStyle = css({
  width: 'max-content',
  '& p': {
    marginBottom: '1rem',
  },
});

export default function QuizContainer(props: Props) {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const currentUser = getCurrentUser(user);
  const handleUserRedirect = () => {
    if (!currentUser.name) router.push('/');
  };
  const { type } = props;

  useEffect(() => {
    handleUserRedirect();
  }, []);

  return (
    <div className={quizInfoContainerCss}>
      <div className={cardCss}>
        <GenericIcon type={type} size={'xlarge'} />
      </div>
      <div className={textContainerStyle}>
        <p>クイズの種類: {type}</p>
        <p>クイズの問題数: 10</p>
      </div>
      <Link href={`${type}/questions/1`} className={startButtonCss}>
        <p>スタート</p>
      </Link>
    </div>
  );
}
