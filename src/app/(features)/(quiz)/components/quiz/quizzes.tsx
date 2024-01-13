'use client';

import { useRouter } from 'next/navigation';
import { useState, useContext, useEffect } from 'react';
import { Quiz } from 'app/entity/Quiz';
import { UserContext } from 'app/providers/UserProvider';
import { getCurrentUser } from 'app/utils/auth';
import { flex } from '../../../../../../styled-system/patterns/flex';
import { css, cva } from '../../../../../../styled-system/css';
import GenericIcon from 'app/components/Elements/GenericIcon';
import Link from 'next/link';
import { getFetch } from 'app/utils/fetch';

const containerCss = flex({
  justifyContent: 'space-around',
  flexWrap: 'wrap',
  width: '40%',
  marginTop: '5%',
  marginLeft: '30%',
});

const quizContainerRecipe = cva({
  base: {
    width: '15rem',
    marginBottom: '10%',
    padding: '4rem',
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
  },
  variants: {
    availability: {
      unavailable: {
        backgroundColor: '#d3d3d3',
        color: '#757474',
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
    },
  },
});

const comingSoonCss = css({
  position: 'absolute',
  opacity: 0.5,
  marginTop: '8rem',
  fontWeight: 'bold',
});

const fetchQuizzes = async () => {
  return await getFetch<Quiz>('quizzes');
};

export default function Quizzes() {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const currentUser = getCurrentUser(user);
  const [quizzes, setQuizzes] = useState<Quiz[]>();

  const handleUserRedirect = () => {
    if (!currentUser.name) router.push('/');
  };

  useEffect(() => {
    handleUserRedirect();
    void (async () => {
      try {
        const response = await fetchQuizzes();
        setQuizzes(response);
      } catch (error) {
        throw new Error(`Failed to login: ${error}. Please check your credentials and try again`);
      }
    })();
  }, []);

  return (
    <div className={containerCss}>
      {quizzes?.map((q) => {
        const isUnavailable = q.name != 'Slack';

        return (
          <Link
            key={`quiz-${q.id}`}
            href={`/quizzes/${q.name.toLowerCase()}`}
            className={quizContainerRecipe(isUnavailable ? { availability: 'unavailable' } : {})}
            scroll={false}
          >
            <GenericIcon type={q.name.toLocaleLowerCase()} size={'large'} />
            {q.name}
            {isUnavailable && <span className={comingSoonCss}>Coming Soon...</span>}
          </Link>
        );
      })}
    </div>
  );
}
