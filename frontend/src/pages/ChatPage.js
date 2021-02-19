import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import io from "socket.io-client";
const ls = require("local-storage")

const ENDPOINT = 'http://localhost:3000';

let socket;

export const ChatPage = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  let query= new URLSearchParams(useLocation().search)
  let uid=query.get("id")
  function roomname(x,y){
    if(x>y)
      return x+y
    else
    return y+x
  }
  useEffect(() => {    
    let name=uid
    let room= roomname(uid, ls('user_id'))
    var connectionOptions =  {
      "force new connection" : true,
      "reconnectionAttempts": "Infinity", 
      "timeout" : 10000,                  
      "transports" : ["websocket"]
  };

    socket = io.connect(ENDPOINT,connectionOptions);

    //socket = io(ENDPOINT);

    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [ENDPOINT]);
  
  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
    return () => {
      console.log('closed')
      socket.removeAllListeners();
      socket.close();
    };
}, []);

useEffect(()=>{
  console.log(messages )
},[messages])
  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }


  return (
    <div className="container pt-5" >
    <div className="jumbotron p-4 border bg-white col-md-6 m-auto" >
 
      <h5> {room} </h5>
    <div>
    <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
    <button className="sendButton" onClick={e => sendMessage(e)}>Send</button>
  </form>

    <h3> {messages.length} </h3>

      

    </div>

    </div>
    </div>
  )
}
