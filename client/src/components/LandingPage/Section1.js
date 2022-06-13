import React, {useState, useRef, useEffect} from "react";
import styled, {css, keyframes} from "styled-components";
import { Link } from "react-router-dom";

const move_Bus = keyframes`
  0% {
    transform: translate(-100%);
  }
  100% {
    transform: translate(100%);
  }
`

const Section = styled.section`
  width: 100%;
  height: ${props => `${props.innerHeight}px`};
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: limegreen;

  @media (max-width: 992px) {
    flex-direction: column;
    justify-content: center;
    gap: 3rem;
    &:nth-child(3) {
      flex-direction: column-reverse;
      justify-content: space-round;
    }
  }
`

const First_Desc = styled.div`
    width: 50%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10%;
  // border: 1px solid black;

  h1 {
    font-size: 2vw;
    font-weight: bold;
    line-height: 1.5;
  }

  p {
    font-size: 1.5vw;
    line-height: 1.5;
  }

  span {
    font-size: 3rem;
    font-weight: bold;
    letter-spacing: 3px;
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

  a:hover ~ img {
    // animation-name: ${move_Bus};
    // animation-duration: 1s;
    // animation-timing-function: ease-in-out;
    // animation-iteration-count: infinite;
    // animation-direction: alternate;
    position: relative;
    left: 100%;
  }

  img {
    width: 15%;
    height: auto;
    transform: translate(-100%);
    transition: all 1.5s ease;
    position: relative;
    left: 0;
  }
`

export default function Section1({innerHeight}) {
  
  return(
      <Section innerHeight={innerHeight}>
        <First_Desc>
          <p>
            나만아는 좋은 곳을 다른 사람과 공유해보세요!
          </p>
          <span>NADRI</span>
          <Link to={'/'}><button className='Btn'>시작하기</button></Link>
          <img id='moveBus' src='img/nadri-logo-small.png' />
        </First_Desc>
      </Section>
  )
}