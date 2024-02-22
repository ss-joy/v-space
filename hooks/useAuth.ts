import { AuthConext } from "@/context/auth-context";
import { useContext } from "react";

export default function useAuth() {
  const authCtx = useContext(AuthConext);
  if (authCtx === null) {
    throw new Error(
      "In order to use auth context keep component inside the auth provider"
    );
  }
  return {
    userId: authCtx.userId,
    userIsAuthenticated: authCtx.userIsAuthenticated,
  };
}
