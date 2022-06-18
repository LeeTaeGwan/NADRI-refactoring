import React, {useState, useRef, useEffect} from "react";
import styled, {css, keyframes} from "styled-components";
import { Link } from "react-router-dom";

const Section = styled.section`
  width: 100%;
  height: ${props => `${props.innerHeight}px`};
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 100px;

  p {
    font-size: 2.6vw;
    line-height: 1.5;
    font-weight: 500;
  }

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

export default function({innerHeight}) {
  return(
    <Section innerHeight={innerHeight}>
    <p>NADRI와 함께 나들이 한번 떠나보시겠어요?!</p>
    <Link to={'/'}><button className='Btn'>시작하기</button></Link>
  </Section>
  )
}