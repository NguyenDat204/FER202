import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

const THEMES = {
  light: { name: "light" },
  dark: { name: "dark" },
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("theme_mode");
      return saved ? JSON.parse(saved) : THEMES.light;
    } catch {
      return THEMES.light;
    }
  });

  useEffect(() => {
    localStorage.setItem("theme_mode", JSON.stringify(theme));
    document.body.dataset.theme = theme.name;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => (t.name === "light" ? THEMES.dark : THEMES.light));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
