import React from "react";
import { useEffect } from "react";
import io from "socket.io-client";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import Info from "../components/info";
import MessageCard from "../components/messageCard";

const Chat = () => {
  const endpoint = "http://localhost:5000";
  const location = useLocation();
  const [clientName, setClientName] = useState("");
  const [clientRoom, setClientRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const socket = io(endpoint, {
    cors: {
      origin: endpoint,
      credentials: true,
      methods: ["GET", "POST"]
    },
    transports: ["websocket"],
  });

 
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    console.log(`user ${name}, joined room ${room}`);
socket.on('connect', () => {
      console.log('socket connected');
      console.log(socket);
    });
    
    setClientName(name);
    setClientRoom(room);
    console.log(socket);
    socket.emit("join", { name, room }, ({ error }) => {
      console.log(`error: ${error.error}`)
      // alert(error);
    });

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [socket, location.search]);

  useEffect(() => {
    socket.on("message", (receivedMessage) => {
      setMessages((prev)=>[...prev, receivedMessage]);
    });
  }, [socket]);

  // socket.on("message", (message) => {
  //   setMessages([...messages, message]);
  //   console.log(messages);
  // });

  //function for sending message
  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };
  console.log(`current:${message} and all ${messages}`);

  return (
    <div>
      <h1>chat me </h1>
      <Info room={clientRoom} />
      {
        messages.map((message, index) => (
          <MessageCard key={index} message={message} name={clientName} />
        ))}
        <form>
          <input
        type="text"
        name=""
        id=""
        placeholder="Type your message"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyUp={(event) => (event.key === "Enter" ? sendMessage(event) : null)}
      />
      <button onClick={(e)=>sendMessage(e)}>Send</button>
        </form>
      
    </div>
  );
};
export default Chat;
