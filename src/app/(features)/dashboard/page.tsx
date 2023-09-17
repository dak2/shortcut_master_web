'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useContext, useEffect } from 'react';
import LogoutButton from 'app/components/Button/LogoutButton';
import { UserContext } from 'app/providers/UserProvider';
import { getCurrentUser } from 'app/utils/auth';

// entry point of dashboard
export default function Dashboard() {
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
      {currentUser.name ? `Hello ${currentUser.name ?? ''}` : 'You are not logged in'}
      <LogoutButton />
      <Link href="/quizzes">クイズを選ぶ</Link>
    </div>
  );
}
