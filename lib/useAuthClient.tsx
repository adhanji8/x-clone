"use client";
import { createContext, useContext, useState } from "react";

type UserContextProviderProps = {
  children: React.ReactNode;
};
type UserContext = {
  user: { username?: string };
  setUser: React.Dispatch<React.SetStateAction<any>>;
};

export const UserContext = createContext<UserContext | null>(null);

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState({});
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default function useAuthClient() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useThemeContext must be used within ThemeContextProvider");
  }
  return context;
}
