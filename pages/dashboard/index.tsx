import { useState, useContext, useEffect } from "react";
import { UserContext } from "providers/UserProvider";
import LogoutButton from "components/elements/button/LogoutButton";
import { useRouter } from "next/router";
import Link from "next/link";
import { getCurrentUser } from "lib/auth";

// entry point of dashboard
export default function Dashboard() {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const currentUser = getCurrentUser(user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser.name) {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, []);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      {currentUser.name
        ? `Hello ${currentUser.name ?? ""}`
        : "You are not logged in"}
      <LogoutButton />
      <Link href="/quizzes">クイズを選ぶ</Link>
    </div>
  );
}
