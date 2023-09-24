'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { UserContext } from 'app/providers/UserProvider';
import { getCurrentUser } from 'app/utils/auth';

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
    <div>
      <Link href="/quizzes">クイズを行う</Link>
    </div>
  );
}
