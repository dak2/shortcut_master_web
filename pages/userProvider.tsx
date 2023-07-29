import React, { createContext, useState, SetStateAction, Dispatch, useEffect } from 'react';

export type User = {
  name: string | null;
}

type UserContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

const defaultUserContext = {
  user: {
    name: null,
  },
  setUser: () => {}
};

const UserContext = createContext<UserContextType>(defaultUserContext);

function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(defaultUserContext.user);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser({ name: savedUser });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
