// context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem("users");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const register = (username, password) => {
    if (users.find((u) => u.username === username)) {
      throw new Error("Username already exists");
    }
    const newUser = { username, password };
    setUsers([...users, newUser]);
    return newUser;
  };

  const login = (username, password) => {
    const found = users.find(
      (u) => u.username === username && u.password === password
    );
    if (!found) throw new Error("Invalid username or password");
    setUser(found);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, users, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
