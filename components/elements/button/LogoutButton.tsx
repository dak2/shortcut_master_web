import { useContext } from "react";
import { UserContext } from "providers/UserProvider";
import { useRouter } from "next/router";

export default function LogoutButton() {
  const { setUser } = useContext(UserContext);
  const router = useRouter();

  const logout = async () => {
    const logoutUrl = process.env.NEXT_PUBLIC_API_URL + "/logout";
    try {
      const response = await fetch(logoutUrl, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setUser(null);
        localStorage.removeItem("user_name");
        router.push("/");
      } else {
        throw new Error(
          "Network response was not ok. Please check your credentials and try again"
        );
      }
    } catch (error) {
      throw new Error(
        `Failed to login: ${error}. Please check your credentials and try again`
      );
    }
  };

  return <button onClick={() => logout()}>Logout</button>;
}
