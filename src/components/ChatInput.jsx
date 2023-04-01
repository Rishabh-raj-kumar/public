import React from 'react'
import styled from "styled-components";
import Picker from "emoji-picker-react";
import {IoMdSend} from "react-icons/io"
import {BsEmojiSmileFill} from "react-icons/bs";

export default function ChatInput({ handleSendMsg }) {
    const [showEmojiPicker,setShoeEmojiPicker]  = React.useState(false);
    const [msg,setMsg] = React.useState('');

    const handleEmojiPickerShow = () =>{
        setShoeEmojiPicker(!showEmojiPicker);
    }
    function sendChat(event){
        event.preventDefault();
        if(msg.length > 0){
            handleSendMsg(msg);
            setMsg('')
        }
    }

  return (
    <Container>
         <div className="button-container">
            <div className="emoji">
                <BsEmojiSmileFill onClick={
                    () => {handleEmojiPickerShow()}
                } />
                {
                    showEmojiPicker && <Picker onEmojiClick={
                        (emojiObject)=> setMsg((prevMsg)=> prevMsg + emojiObject.emoji)
                    }/>
                }
            </div>
         </div>
         <form className="input-container" onSubmit={(e) => sendChat(e)}>
            <input type="text" placeholder='type your message here..'
            value={msg}
            onChange = {(e) => setMsg(e.target.value)} />
             <button className="submit">
                <IoMdSend />
             </button>
         </form>
    </Container>
  )
}

const Container = styled.div`
  display : grid;
  grid-template-columns:5% 95%;
  align-items:center;
  background-color:#080420;
  padding:0.2rem;
  padding-bottom:0.3rem;
  .button-container{
    display : flex;
    align-items:center;
    gap:1rem;
    color:white;
    .emoji{
        position:relative;
        svg{
            font-size:1.5rem;
            color:yellow;
            cursor:pointer;
        }
        .epr-main{
            max-height:280px;
        }
        .EmojiPickerReact{
            position:absolute;
            top:-300px;
            .epr-preview{
                display:none;
            }
        }
    }
  }
  .input-container{
    width:100%;
    border-radius:2rem;
    display:flex;
    align-items:center;
    gap:2rem;
    input{
        width:90%;
        height:60%;
        background-color:transparent;
        color:white;
        border:none;
        padding-left:1rem;
        font-size:1.2rem;
        &:focus{
            outline:none;
        }
    }
    button{
        padding:0.3rem 2rem;
        border-radius:2rem;
        display:flex;
        align-items:center;
        justfiy-content:center;
        background-color:purple;
        border:none;
        cursor:pointer;
        svg{
            font-size:2rem;
            color:white;
        }
    }
  }
`;
