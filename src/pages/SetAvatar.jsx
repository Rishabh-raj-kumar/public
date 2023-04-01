import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Buffer } from "buffer";
import cat from "../assets/1kLR.gif";
import {SetAvatarRoute} from "../utils/APIRoutes"

function SetAvatar() {
  const api = "https://api.multiavatar.com/45678945";
  const navigate = useNavigate();
  const [avatar, Setavatar] = useState([]);
  const [isLoading, SetLoading] = useState(true);
  const [selectAvatar, setSelectAvatar] = useState(undefined);

  const toastPos = {
    position: "bottom-right",
    autoClose: "5000",
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const setProfilePicture = async () => {
    if (selectAvatar === undefined) {
      toast.error("Please select an avatar", toastPos);
    }else{
        const user = await JSON.parse(localStorage.getItem("chat-app-user"));
        const {data} = await axios.post(`${SetAvatarRoute}/${user._id}`,{
            image: avatar[selectAvatar],
        })

        if(data.isSet){
            user.isAvatarSet = true;
            user.avatarImage = data.image;
            localStorage.setItem("chat-app-user",JSON.stringify(user));
            navigate("/")
        }
        else{
            toast.error("Error while setting avatar, Please retry again..", toastPos);
            navigate("/")
        }
    }
  };

  useEffect(() => {
    const show = async () => {
      const data = [];
      for (let i = 0; i < 5; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      Setavatar(data);
      SetLoading(false);
    };

    show();
  }, []);

  return (
    <>
      {isLoading ? (
        <Container>
            <img src={cat} alt="loader" className="loading"
             style={{ width:"150px", height:"150px"}}></img>
            <h3 style={{ color : "white"}}>Wait while avatar is loading...</h3>
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an avatar as Image.</h1>
          </div>
          <div className="avatars">
            {avatar.map((avatars, index) => {
              return (
                <div
                  key={index}
                  className={`avatar
                          ${selectAvatar === index ? "selected" : ""}
                         `}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatars}`}
                    alt="avatar"
                    onClick={() => setSelectAvatar(index)}
                  ></img>
                </div>
              );
            })}
          </div>
          <button
            className="submit"
            onClick={() => {
              setProfilePicture();
            }}
          >
            Set as Profile Picture.
          </button>
        </Container>
      )}
      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5rem;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
      }
    }
    .selected {
      border: 0.4rem solid purple;
    }
  }
  .submit {
    background-color: #997af0;
    padding: 1rem 2rem;
    color: white;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    transition: 0.25s ease-in-out;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;

export default SetAvatar;
