import React from "react";

function NameList({ names }) {
  return (
    <div>
      <h3>Hello</h3>
      <ul>
        {names.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </div>
  );
}

export default NameList;
