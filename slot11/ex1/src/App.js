import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ProfileForm from "./components/ProfileForm";

function App() {
  const handleSubmit = (data) => {
    console.log("Dữ liệu đã submit:", data);
  };

  return (
    <div className="App">
      <h2 className="text-center mt-4">Profile Form</h2>
      <ProfileForm onSubmit={handleSubmit} />
    </div>
  );
}

export default App;
