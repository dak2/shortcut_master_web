import { useState, useContext, useEffect } from "react";
import { UserContext } from "providers/UserProvider";
import { useRouter } from "next/router";
import { getCurrentUser } from "lib/auth";

// entry point of quizzes
export default function Quizzes() {
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

  return loading ? <div>Loading...</div> : <div>クイズ</div>;
}
