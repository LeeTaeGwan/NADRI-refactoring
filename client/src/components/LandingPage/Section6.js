import React, {useState, useRef, useEffect} from "react";
import styled, {css, keyframes} from "styled-components";

const ImgSection = styled.section`
  width: 100%;
  height: ${props => `${props.innerHeight*2}px`};
`

const FinalImg = styled.div`
  width: 100%;
  height: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top center;
  background-image: url(${props => props.img});
  position: relative;
`

export default function Section6({innerHeight}) {
  const [isValid, setIsValid] = useState(false)
  const target = useRef(null)
  const startY = useRef(innerHeight * 4)
  const endY = useRef(innerHeight * 5)

  const options = {
    root: null, // .container class를 가진 엘리먼트를 root로 설정. null일 경우 브라우저 viewport
    rootMargin: '0px', // rootMargin을 '10px 10px 10px 10px'로 설정
    threshold: 0 // 타겟 엘리먼트가 교차영역에 진입했을 때, 교차영역에 타켓 엘리먼트의 50%가 있을 때, 교차 영역에 타켓 엘리먼트의 100%가 있을 때 observe가 반응한다.
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
    console.log(isValid)
    if(isValid) {
      window.addEventListener('scroll', handleScroll)
    }
  })

  return(
    <ImgSection innerHeight={innerHeight} ref={target}>
      <FinalImg img={'/landingImg/풍경.png'}/>
    </ImgSection >
  )
}