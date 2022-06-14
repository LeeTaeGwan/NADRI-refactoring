import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Section1 from '../components/LandingPage/Section1';
import Section2 from '../components/LandingPage/Section2';
import Section3 from '../components/LandingPage/Section3';
import Section4 from '../components/LandingPage/Section4';
import Section5 from '../components/LandingPage/Section5';
import Section6 from '../components/LandingPage/Section6';
import Footer from '../components/Footer'

const RandingContainer = styled.div`
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

const LastSection = styled.section`
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

export default function Landing () {

  const innerHeight = useRef(window.innerHeight)

  return (
    <RandingContainer>

      <Section1 innerHeight={innerHeight.current}/>
      <Section2 innerHeight={innerHeight.current}/>
      <Section3 innerHeight={innerHeight.current}/>
      <Section4 innerHeight={innerHeight.current}/>
      <Section5 innerHeight={innerHeight.current}/>
      <Section6 innerHeight={innerHeight.current}/>


      <LastSection innerHeight={innerHeight.current}>
        <p>
          NADRI와 함께 나들이 한번 떠나보시겠어요?!
        </p>
        <Link to={'/'}><button className='Btn'>시작하기</button></Link>
      </LastSection>
      
      <Footer />
    </RandingContainer>
  )
}