import { useContext } from "react";
import { UserContext } from "./userProvider";

export default function Home() {
  const { user } = useContext(UserContext);
  const message = user ? `Hello ${user.name ?? ''}` : "You are not logged in";

  return <div> {message} </div>;
}