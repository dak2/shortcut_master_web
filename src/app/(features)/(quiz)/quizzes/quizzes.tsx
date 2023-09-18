'use client';

import { useRouter } from 'next/navigation';
import { useState, useContext, useEffect } from 'react';
import { Quiz } from 'app/(features)/(quiz)/Quiz';
import { UserContext } from 'app/providers/UserProvider';
import { getCurrentUser } from 'app/utils/auth';

export default function Quizzes() {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const currentUser = getCurrentUser(user);
  const [quizzes, setQuizzes] = useState<Quiz[]>();

  const handleUserRedirect = () => {
    if (!currentUser.name) router.push('/');
  };

  const fetchQuizzes = async () => {
    return await fetch('http://127.0.0.1:3000/quizzes', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  useEffect(() => {
    handleUserRedirect();
    void (async () => {
      try {
        const response = await fetchQuizzes();
        if (response.ok) {
          const data = await response.json();
          setQuizzes(data);
        } else {
          throw new Error('Network response was not ok. Please check your credentials and try again');
        }
      } catch (error) {
        throw new Error(`Failed to login: ${error}. Please check your credentials and try again`);
      }
    })();
  }, []);

  return <div>{quizzes?.map((q) => q.name)}</div>;
}
