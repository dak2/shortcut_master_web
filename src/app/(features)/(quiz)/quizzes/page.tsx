'use client';
import { useRouter } from 'next/navigation';
import { useState, useContext, useEffect } from 'react';
import Quizzes from 'app/(features)/(quiz)/quizzes/quizzes';
import { UserContext } from 'app/providers/UserProvider';
import { getCurrentUser } from 'app/utils/auth';

// entry point of quizzes
export default function Page() {
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

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <Quizzes />
    </div>
  );
}
