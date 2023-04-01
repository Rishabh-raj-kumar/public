import React from 'react'
import styled from "styled-components";

export default function welcome({currentUser}) {
  return (
    <Container>
       <div>
      <h1>Welcome <span>{currentUser.username}</span></h1>
      <p>start chatting with others.</p>
      </div>
    </Container>
  )
}

const Container = styled.div`
    display:grid;
    place-items:center;
    color:white;
    h1{
        span{
            color:purple;
        }
    }
`;
