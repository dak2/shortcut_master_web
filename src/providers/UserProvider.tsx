'use client';
import React, { createContext, useState, SetStateAction, Dispatch, useEffect } from 'react';

export type User = {
  name: string | null;
};

type UserContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

const defaultUserContext = {
  user: {
    name: null,
  },
  setUser: () => {},
};

const UserContext = createContext<UserContextType>(defaultUserContext);

function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(defaultUserContext.user);

  useEffect(() => {
    const userName = localStorage.getItem('user_name');
    if (userName) {
      setUser({ name: userName });
    }
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}

export { UserContext, UserProvider };
