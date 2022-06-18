import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';

import Section1 from '../components/LandingPage/Section1';
import Section2 from '../components/LandingPage/Section2';
import Section3 from '../components/LandingPage/Section3';
import Section4 from '../components/LandingPage/Section4';
import Section5 from '../components/LandingPage/Section5';
import Section6 from '../components/LandingPage/Section6';
import Section7 from '../components/LandingPage/Section7';

const RandingContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 992px) {
    & section:nth-child(3) {
      & >:first-child {
        height: auto;
      }
    }
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
      <Section7 innerHeight={innerHeight.current}/>

    </RandingContainer>
  )
}