import React, {useState, useRef, useEffect} from "react";
import styled, {css, keyframes} from "styled-components";

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

const Section = styled.section`
  width: 100%;
  height: ${props => `${props.innerHeight}px`};
`

const Img = styled.div`
  ${(props) => {
    const {isValid, scrollY, startY, endY} = props
    const percent = ((endY - startY)/100)

    if(isValid && scrollY <= endY) {
      const curPercent = (scrollY - startY) / percent
      return(`
        width: ${curPercent}%;
      `)
    }
    else if(!isValid) {
      return(`
      display: none;
      `)
    }
    else {
      return(`
        width: 100%;
        height: 100%;
        position: fixed;
        bottom: 0;
      `)
    }
  }};
  margin: 0 auto;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  background-image: url(${props => props.img});
`


export default function Section5({innerHeight}) {
  const [isValid, setIsValid] = useState(false)
  const target = useRef(null)
  const startY = useRef(innerHeight * 3)
  const endY = useRef(innerHeight * 4)

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0
  }

  const io = new IntersectionObserver(([{isIntersecting}]) => {
    setIsValid(isIntersecting)
  }, options)
  
  useEffect(() => {
    io.observe(target.current)
  }, [])

  const [scrollY, setScrollY] = useState(window.scrollY)

  function handleScroll() {
    setScrollY(window.scrollY)
  }

  useEffect(() => {
    if(isValid) {
      window.addEventListener('scroll', handleScroll)
    }
  })

  return(
    <Section innerHeight={innerHeight} ref={target}>
        <Img img={'/landingImg/forest.png'} isValid={isValid} startY={startY.current} endY={endY.current} scrollY={scrollY}/>
    </Section>
  )
}