import { useContext } from "react";
import { UserContext } from "./user-provider";
import LogoutButton from "./components/logout-button";

export default function UserHome() {
  const { user } = useContext(UserContext);
  const message = user ? `Hello ${user.name ?? ""}` : "You are not logged in";

  return (
    <div>
      {message}
      {LogoutButton()}
    </div>
  )
}
