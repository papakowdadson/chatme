import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  // const handleSubmit = ()=>{
  //     const data ={name,room}
  // }

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleRoomChange = (e) => {
    setRoom(e.target.value);
  };

  return (
    <>
      <h1>Join</h1>
      {/* <form onSubmit={handleSubmit}> */}
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Enter your name"
        onChange={(e) => handleNameChange(e)}
      />
      <input
        type="text"
        name="room"
        id="room"
        placeholder="Enter chat room"
        onChange={(e) => handleRoomChange(e)}
      />
      <Link onClick={(e)=>(name=='' || room=='')? e.preventDefault() :null} to={`/chat?name=${name}&room=${room}`}>
        <button type="submit">Sign In</button>
      </Link>

      {/* </form> */}
    </>
  );
};

export default Join;
