import React from 'react'
import axios from 'axios'
import {BiPowerOff} from "react-icons/bi"
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
export default function LogOut() {
    const navigate = useNavigate();
    const handleClick = async () =>{
        localStorage.clear();
        navigate('/login');
    }
  return (
    <Button onClick={
        () => {handleClick()}
    }>
        <BiPowerOff />
    </Button>
  )
}

const Button = styled.button`
  display:flex;
  align-items:center;
  justify-content:center;
  padding:0.5rem;
  border-radius:0.5rem;
  background-color:purple;
  border:none;
  cursor:pointer;
  svg{
    font-size:1.3rem;
    color:#ebe7ff;
  }
`;