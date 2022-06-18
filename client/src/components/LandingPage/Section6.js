import React, {useState, useRef, useEffect} from "react";
import styled, {css, keyframes} from "styled-components";

const Section = styled.section`
  width: 100%;
  height: ${props => `${props.innerHeight*2}px`};
  position: relative;
`

const Img = styled.div`
  width: 100%;
  height: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  background-image: url(${props => props.img});
  position: relative;

  ${(props) => {
    const {isValid, startY, endY, scrollY, innerHeight, width} = props
    const percent = ((endY - startY)/100)
    const curPercent = ((scrollY - startY) / percent)

    if(isValid) {
      // console.log(100 - (curPercent - 100) * 0.3, curPercent)
      return(`
        width: ${100 - (curPercent - 100) * 0.3}%;
        height: ${100 - (curPercent - 100) * 0.3}%;
        position: fixed;
        margin: auto;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      `)
      
    }
    else if(!isValid && scrollY >= endY) {
      console.log(width*0.7)
      return(`
        width: ${width*0.7}px;
        height: ${innerHeight*0.7}px;
        position: absolute;
        bottom: ${(innerHeight - innerHeight*0.7) / 2}px; // (뷰포트 높이 - 사진 높이) / 2
        left: ${(width - width*0.7) / 2}px; // (뷰포트 길이 - 사진 길이) / 2
      `)
    }
  }};
`

export default function Section6({innerHeight}) {
  const [isValid, setIsValid] = useState(false)
  const target = useRef(null)
  const startY = useRef(innerHeight * 4)
  const endY = useRef(innerHeight * 5)
  const width = useRef(window.innerWidth)
  

  const options = {
    root: null, // .container class를 가진 엘리먼트를 root로 설정. null일 경우 브라우저 viewport
    rootMargin: '0px', // rootMargin을 '10px 10px 10px 10px'로 설정
    threshold: 0.49 // 타겟 엘리먼트가 교차영역에 진입했을 때, 교차영역에 타켓 엘리먼트의 50%가 있을 때, 교차 영역에 타켓 엘리먼트의 100%가 있을 때 observe가 반응한다.
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
      <Img img={'/landingImg/풍경.png'} width={width.current} innerHeight={innerHeight} isValid={isValid} startY={startY.current} endY={endY.current} scrollY={scrollY}/>
    </Section >
  )
}