'use client';
import { getCurrentUser } from 'lib/auth';
import { useRouter } from 'next/navigation';
import { UserContext } from 'providers/UserProvider';
import { useState, useContext, useEffect } from 'react';

// entry point of quizzes
export default function Quizzes() {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const currentUser = getCurrentUser(user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser.name) {
      router.push('/');
    } else {
      setLoading(false);
    }
  }, []);

  return loading ? <div>Loading...</div> : <div>クイズ</div>;
}
