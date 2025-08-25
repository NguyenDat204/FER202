// src/contexts/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { createAccount, findAccountByEmail } from "../utils/api";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [redirectAfterLogin, setRedirectAfterLogin] = useState("/");

  // ==== LOGIN ====
  const login = async (email, password) => {
    const acc = await findAccountByEmail(email);
    if (acc && acc.password === password) {
      setUser(acc);
      localStorage.setItem("user", JSON.stringify(acc));
      return acc;
    }
    throw new Error("Invalid email or password");
  };

  // ==== REGISTER ====
  const register = async (newUser) => {
    // Kiểm tra email tồn tại
    const exists = await findAccountByEmail(newUser.email);
    if (exists) {
      throw new Error("Email đã tồn tại!");
    }

    // newUser phải là object phẳng, có name là string
    const payload = {
      name: newUser.name,
      email: newUser.email,
      username: newUser.username,
      password: newUser.password,
      question: newUser.question,
      answer: newUser.answer,
      avatar: newUser.avatar || "",
      wishlist: [],
      cart: []
    };

    const created = await createAccount(payload);
    setUser(created);
    localStorage.setItem("user", JSON.stringify(created));
    return created;
  };

  // ==== LOGOUT ====
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        redirectAfterLogin,
        setRedirectAfterLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
