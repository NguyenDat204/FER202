import React from "react";
import "./App.css";
import AppNavbar from "./components/AppNavbar";
import AppRoutes from "./routes/AppRoutes";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className="App">
      <AppNavbar />
      <AppRoutes />
    </div>
  );
};

export default App;
