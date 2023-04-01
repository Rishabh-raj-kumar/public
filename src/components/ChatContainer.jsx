import axios from "axios";
import React, {useState, useEffect, useRef} from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import LogOut from "./LogOut";
import Messages from "./Messages";
import {sendMessageRoute,getAllMessageRoute} from "../utils/APIRoutes"

export default function ChatContainer({ currentChat,currentUser,socket }) {

  const [message,setMessage] = useState([]);
  const [arrivalMessage,setArrivalMessage] = useState(null);
  const scrollRef = useRef()

  useEffect(() => {
    if(currentChat){
      const show = async () =>{
        const responce = await axios.post(getAllMessageRoute,{
           from : currentUser._id,
           to : currentChat._id
        })
        setMessage(responce.data);
      }
      show();
    }
  },[currentChat])
  const handleSendMsg = async (msg) =>{
    await axios.post(sendMessageRoute,{
        from : currentUser._id,
        to : currentChat._id,
        message : msg
    });
    socket.current.emit("send-msg",{
      from : currentUser._id,
        to : currentChat._id,
        message : msg
    })

    const msgs = [...message];
    msgs.push({ fromSelf : true, message : msg });
    setMessage(msgs);
  }

    useEffect(() =>{
      if(socket.current){
        socket.current.on("msg-recieve",(msg) =>{
          setArrivalMessage({
            fromSelf:false,
            message:msg
          })
        })
      }
    },[])

    useEffect(() =>{
       arrivalMessage && setMessage((prev) => [...prev,arrivalMessage]);
    },[arrivalMessage])

  useEffect(() =>{
    scrollRef.current?.scrollIntoView({ behaviour: "smooth"})
  },[message])
  return (
    <>
      {currentChat && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h3>{currentChat.username}</h3>
              </div>
            </div>
            <LogOut />
          </div>
          <div className="chat-message">
            {
              message.map((msg) =>{
                return(
                  <div>
                    <div className={`message ${msg.fromSelf ? "sended":"recieved"}`}>
                      <div className="content">
                        <p>
                          {msg.message}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <ChatInput handleSendMsg = {handleSendMsg} />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  padding-top: 0.4rem;
  display:grid;
  grid-template-rows:10% 78% 12%;
  gap:0.1rem;
  overflow:hidden;
  .chat-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.3rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username{
        h3{
            color:white;
        }
      }
    }
  }
  .chat-message{
    padding:1rem 2rem;
    display:flex;
    flex-direction:column;
    gap:1rem;
    overflow:auto;
    &::-webkit-scrollbar{
      width:0.2rem;
      &-thumb{
        background-color:#ffffff69;
        width:0.1rem;
        border-radius:1rem;
      }
    }
    .message{
      display:flex;
      align-items:center;
      .content{
        max-width:40%;
        overflow-wrap:break-word;
        font-size:1.1rem;
        border-radius:1rem;
        color:white;
        background:purple;
        padding:1rem;
      }
    }
    .sended{
      justify-content:flex-end;
      .content{
        background-color:green;
      }
    }
    .recieved{
      justify-content:flex-start;
      .content{
        background-color:purple;
      }
    }
  }
`;
