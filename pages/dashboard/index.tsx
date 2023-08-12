import { useState, useContext, useEffect } from "react";
import { User, UserContext } from "../user-provider";
import LogoutButton from "../../components/elements/button/LogoutButton";
import { useRouter } from "next/router";

export default function UserHome() {
  const { user } = useContext(UserContext);
  const router = useRouter();
  // ref. https://stackoverflow.com/a/73853147
  const localStorage =
    typeof window !== "undefined" ? window.localStorage : undefined;
  const userName =
    user && user.name ? user.name : localStorage?.getItem("user_name");
  const currentUser: User = userName ? { name: userName } : { name: null };
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
    </div>
  );
}
