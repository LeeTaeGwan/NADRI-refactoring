import React from "react";
import styled, {css, keyframes } from "styled-components";


export const RandingContainer = styled.div`
  display: flex;
  flex-direction: column;

  section:nth-child(2) {
    background-color: #F2F2F2;
  }

  section:nth-child(4) {
    background-color: #F2F2F2;
  }

  @media (max-width: 992px) {
    & section:nth-child(3) {
      & >:first-child {
        height: auto;
      }
    }
  }
`

export const ImgSection = styled.section`
  width: 100%;
  height: ${props => `${props.innerHeight}px`};
`

const disappear = keyframes`
  0% {
    transform: translate(0, 0);
    opacity: 1;
  }
  100% {
    transform: translate(200px, -200px);
    opacity: 0;
  }
`
// -------------------------------------------------------------- //

export const LastImg = styled.div`
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  background-image: url(${(props) => {
    return (`
      ${props.img}
    `)
  }});
  margin: 0 auto;
  width: 100%;
  height: 100%;
`

export const FinalImg = styled.div`
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  background-image: url(${(props) => {
    return (`
      ${props.img}
    `)
  }});
  position: relative;
`

export const TrickImg = styled.div`
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  background-image: url(${(props) => {
    return (`
      ${props.img}
    `)
  }});
`

export const TrickSection = styled.section`
  width: 100%;
  height: ${props => `${props.innerHeight}px`};
  display: flex;
  justify-content: center;
  align-items: center;
`

export const LastSection = styled.section`
  width: 100%;
  height: ${props => `${props.innerHeight}px`};
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 100px;

  .Btn {
    width: 15vw;
    height: 4.5vw;
    font-size: 2vw;
    border-radius: 20px;
    background-color: #88ccff;
    cursor: pointer;
    border: none;
    color: white;
    box-shadow: 2px 2px 2px 1px rgb(180 180 180);
    a {
      color: white;
    }
  }

  .Btn:active {
    position: relative;
    top: 2px;
  }
`