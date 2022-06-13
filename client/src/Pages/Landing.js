import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';

import {
  RandingContainer,
  ImgSection,
  LastImg,
  FinalImg,
  TrickImg,
  TrickSection,
  LastSection,
} from '../components/LandingPage/styledRanding';
import { Link } from 'react-router-dom';

import Section1 from '../components/LandingPage/Section1';
import Section2 from '../components/LandingPage/Section2';
import Section3 from '../components/LandingPage/Section3';
import Section4 from '../components/LandingPage/Section4';
import Section5 from '../components/LandingPage/Section5';
import Section6 from '../components/LandingPage/Section6';
import Footer from '../components/Footer'


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

      {/* <TrickSection innerHeight={innerHeight.current}>
        <TrickImg img={'/landingImg/풍경.png'}/>
      </TrickSection> */}


      {/* <LastSection innerHeight={innerHeight.current}>
        <p>
          NADRI와 함께 나들이 한번 떠나보시겠어요?!
        </p>
        <Link to={'/'}><button className='Btn'>시작하기</button></Link>
      </LastSection> */}
      
      <Footer />
    </RandingContainer>
  )
}