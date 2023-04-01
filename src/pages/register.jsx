import React,{useState,useEffect} from 'react'
import styled from "styled-components"
import {Link, useNavigate} from "react-router-dom"
import logo from "../assets/logo192.png"
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import {registerRoute} from "../utils/APIRoutes"

function Register() {
  const navigate = useNavigate();
  const [value,setValue] = useState({
    username : "",
    email : '',
    password: "",
    confirmPassword : ""
  })

  //if user is present redirect to chat page..
  useEffect(() =>{
    if(localStorage.getItem("chat-app-user")){
      navigate('/')
    }
  },[])

  const handleSubmit = async (event) =>{
    event.preventDefault();
    if(handleValidation()){
      console.log("in validation",registerRoute);
       const {username,email,password,confirmPassword} = value;
       const {data} = await axios.post(registerRoute,{
        username,
        email,
        password,
       });
       if(data.status === false){
        toast.error(data.msg, toastPos)
       }
       if(data.status === true){
        localStorage.setItem("chat-app-user",JSON.stringify(data.user));
        navigate("/")
       }
    }
  }

  const toastPos = {
    position : "bottom-right",
    autoClose : "5000",
    pauseOnHover : true,
    draggable : true,
    theme  : "dark"
  }

  const handleValidation = () =>{
     const {password,confirmPassword,username,email} = value;
     if(password !== confirmPassword){
      toast.error("Password and Confirm Password must be the same...",toastPos);
      return false;
     }
     else if(username.length < 3){
       toast.error("No userName is les then of length 3...",toastPos);
       return false;
     }
     else if(password.length <6){
      toast.error("Password must be strong enough...",toastPos);
      return false;
     }
     else if(email === ""){
      toast.error("Email must be required...",toastPos);
     }
     return true;
  }

  function handleChange(event){
    setValue({...value,[event.target.name] : event.target.value});
  }
  return (
    <>
    <FormConatiner>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="brand">
          <img src={logo} alt="" />
          <h1>Chatty</h1>
        </div>
        <input type="text"
         placeholder='UserName...'
         name="username"
         onChange={(event) => handleChange(event)}/>

        <input type="Email"
         placeholder='Email'
         name="email"
         onChange={(event) => handleChange(event)}/>

         <input type="Password"
         placeholder='Password'
         name="password"
         onChange={(event) => handleChange(event)}/>
         
         <input type="Password"
         placeholder='Confirm Password'
         name="confirmPassword"
         onChange={(event) => handleChange(event)}/>

         <button type="submit">CREATE USER</button>
         <span>already have an account ? 
          <Link to="/login">Login</Link>
         </span>
      </form>
    </FormConatiner>
    <ToastContainer />
    </>
  )
}

const FormConatiner = styled.div`
   height : 100vh;
   width : 100vw;
   display : flex;
   flex-direction : column;
   justify-content : center;
   gap : 1rem;
   align-items:center;
   background-color : #131324;
   .brand{
     display : flex;
     align-items : center;
     gap:1rem;
     justify-content:center;
     img{
      height : 5rem;
     }
     h1{
      color:white;
      text-transform : uppercase;
     }
   }
   form{
    display:flex;
    flex-direction:column;
    gap:1rem;
    background-color:black;
    border-radius:2rem;
    padding:3rem 5rem;
    input{
      background-color:transparent;
      padding:1rem;
      border : 0.1rem solid #4e0eff;
      color:white;
      font-size:1rem;
      border-radius:5px;
      &:focus{
        border : 0.1rem solid #997af0;
        outline : none;
      }
    }
    button{
      background-color:#997af0;
      padding:1rem 2rem;
      color:white;
      border:none;
      font-weight:bold;
      cursor:pointer;
      border-radius:0.4rem;
      transition: 0.25s ease-in-out;
      text-transform:uppercase;
      &:hover{
        background-color:#4e0eff;
      }
    }
    span{
      color:white;  
      a{
        background-color:white;
        padding:0.2rem;
        border-radius:0.5rem;
        text-transform:uppercase;
        text-decoration:none;
        font-weight:bold;
      }
    }
   }
`;

export default Register;