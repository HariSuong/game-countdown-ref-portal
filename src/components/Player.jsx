import React, { useState, useRef } from "react";

export default function Player() {
  const playerName = useRef();
  const [enterName, setEnterName] = useState(null);

  const submitHandler = () => {
    setEnterName(playerName.current.value);
    playerName.current.value = "";
  };

  return (
    <section id="player">
      <h2>Welcome {enterName ?? "unknown entity"}</h2>
      <p>
        <input type="text" ref={playerName} />
        <button onClick={submitHandler}>Set Name</button>
      </p>
    </section>
  );
}
