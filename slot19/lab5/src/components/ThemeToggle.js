import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Button } from "react-bootstrap";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Button
      variant={theme.name === "light" ? "secondary" : "light"}
      size="sm"
      onClick={toggleTheme}
    >
      {theme.name === "light" ? "🌙 Dark mode" : "☀️ Light mode"}
    </Button>
  );
};

export default ThemeToggle;
