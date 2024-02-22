import { createContext, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
type UserAuthContextType = {
  userIsAuthenticated: boolean;
  userId: null | string;
};
export const AuthConext = createContext<null | UserAuthContextType>(null);
export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [userIsAuthenticated, setUserIsAuthenticated] =
    useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserIsAuthenticated(true);
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      setUserId(user.uid);
    } else {
      setUserIsAuthenticated(false);
    }
  });
  console.log({ userId, userIsAuthenticated });
  return (
    <AuthConext.Provider
      value={{
        userId,
        userIsAuthenticated,
      }}
    >
      {children}
    </AuthConext.Provider>
  );
}
