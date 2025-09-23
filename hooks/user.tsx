"use client";
import { createContext, useContext, useState } from "react";

type User = { id: string; name: string } | null;
const UserContext = createContext<{
  user: User;
  setUser: (u: User) => void;
}>({ user: null, setUser: () => { } });

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
