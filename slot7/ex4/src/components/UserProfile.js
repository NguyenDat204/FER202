import React from "react";

function UserProfile({ user }) {
  return <p>Hello, {user.name}, {user.age}</p>;
}

export default UserProfile;
