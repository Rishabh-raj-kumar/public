import React from 'react'
import styled from "styled-components"
import { useState, useEffect,useRef} from 'react';
import axios from 'axios'
import {useNavigate } from "react-router-dom";
import {allUsersRoute, host} from "../utils/APIRoutes";
import Contacts from '../components/Contacts';
import Welcome from '../components/welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from "socket.io-client"
function Chat() {
  const socket = useRef()
  const navigate = useNavigate();
  const [contact,setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [currentChat,setCurrentChat] = useState(undefined);
  useEffect(() =>{
    const show = async () =>{
      if(!localStorage.getItem('chat-app-user')){
        navigate('/register');
      }
      else{
        setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')));
      }
    }
    show();
  },[])
  
  useEffect(() => {
    const show = async () =>{
       if(currentUser){
        console.log(currentUser);
        if(currentUser.isAvatarSet){
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`)
          setContacts(data.data)
          navigate('/');
        }else{
          // navigate('/setAvatar');
        }
       }
    }
    show();
  },[currentUser])

  useEffect(() =>{
      if(currentUser){
        socket.current = io(host);
        socket.current.emit("add-user",currentUser._id);
      }
  },[currentUser])

  const handleChatChange = (chat) =>{
     setCurrentChat(chat);
  }
  return (
    <Container>
    <div className="Container">
      <Contacts contacts={contact} currentUser={currentUser}
       changeChat={handleChatChange}/>
       {
        currentChat === undefined ? (
          <Welcome currentUser={currentUser}/>
        ):
        (<ChatContainer currentChat={currentChat} currentUser={currentUser} 
          socket={socket} />)
       }
    </div>
    </Container>
  )
}

const Container = styled.div`
  height:100vh;
  width:100vw;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  gap:1rem;
  background-color:#020231;
  .Container{
    height:85vh;
    width:85vw;
    border-radius:0.4rem;
    background-color:#080862;
    display:grid;
    grid-template-columns:25% 75%;
    @media screen and (min-width:720px) and (max-width:1080px){
      grid-template-columns:35% 65%;
    }
  }
`;
export default Chat;