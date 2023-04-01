import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../assets/logo192.png";

export default function Contacts({ contacts, currentUser, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <img src={logo} alt="" />
            <h3>chatty</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => {changeCurrentChat(index, contact)}}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img src={`data:image/svg+xml;base64,${currentUserImage}`} />
            </div>
            <div className="username">
              <h3>{currentUserName}</h3>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display:grid;
  grid-template-rows:10% 75% 15%;
  overflow:hidden;
  border-radius:0.4rem;
  background-color:#080420;
  .brand{
    display:flex;
    align-items:center;
    justify-content:center;
    gap:1rem;
    img{
      height:2rem;
    }
    h3{
      color:white;
      text-transform:uppercase;
    }
  }
  .contacts{
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    overflow:auto;
    gap:0.8rem;
    .contact{
       background-color:#ffffff69;
       min-height:5rem;
       width:90%;
       cursor:pointer;
       border-radius:0.2rem;
       padding:0.4rem;
       gap:1rem;
       display:flex;
       align-items:center;
       transition:0.5s ease-in-out;
       &::-webkit-scrollbar{
        width:0.2rem;
        &-thumb{
          background-color:#ffffff69;
        }
       }
       .avatar{
        img{
          height:3rem;
        }
       }
       .username{
        h3{
          color:white;
        }
       }
    }
    .selected{
      background-color:#5546E0;
    }
  }
  .current-user{
    background-color:#0d03f0;
    display:flex;
    align-items:center;
    justify-content:center;
    gap:2rem;
    .avatar{
      img{
        height:3rem;
      }
     }
    .username{
      h3{
        color:white;
        text-transform:uppercase;
      }
    }
  }
`;
