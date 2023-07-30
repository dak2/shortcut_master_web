import { useContext } from "react";
import { UserContext } from "./user-provider";

export default function UserHome() {
  const { user } = useContext(UserContext);
  const message = user ? `Hello ${user.name ?? ""}` : "You are not logged in";

  return <div> {message} </div>;
}
