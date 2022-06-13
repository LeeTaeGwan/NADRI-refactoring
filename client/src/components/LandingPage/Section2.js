import React, {useState, useRef, useEffect} from "react";
import styled, {css, keyframes} from "styled-components";

const showImgRight = keyframes`
  0% {
    transform: translate(200px, -200px);
    opacity: 0;
  }
  100% {
    transform: translate(0, 0);
    opacity: 1;
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

const Section2_Left_Img = styled.div`
    width: 40%;
    height: 80%;
    transition: all 1s;
    box-shadow: -2px 2px 2px 2px rgb(180 180 180);
    border-radius: 15px;

    img {
      display: block;
      width: 100%;
      height: 100%;
      overflow: hidden;
      border-radius: 15px;
    }

    ${(props) => { // 여기가 새로 추가된 코드
      const {isValid} = props
      if(isValid) {
        
        return(css`
          animation-name: ${showImgRight};
          animation-duration: 1s;
          animation-timing-function: ease-in-out;
        `)
      }
    }}

  @media (max-width: 992px) {
    height: 50%
  }
`

const Section2_Right_Desc = styled.div`
width: 50%;
height: auto;
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
`

export default function Section2({innerHeight}) {

  const [isValid, setIsValid] = useState(false)
  const target = useRef(null)

  const options = {
    root: null, // .container class를 가진 엘리먼트를 root로 설정. null일 경우 브라우저 viewport
    rootMargin: '0px', // rootMargin을 '10px 10px 10px 10px'로 설정
    threshold: 0.1 // 타겟 엘리먼트가 교차영역에 진입했을 때, 교차영역에 타켓 엘리먼트의 50%가 있을 때, 교차 영역에 타켓 엘리먼트의 100%가 있을 때 observe가 반응한다.
  }

  const io = new IntersectionObserver(([{isIntersecting}]) => {
    setIsValid(isIntersecting)
  }, options)
  
  useEffect(() => {
    io.observe(target.current)
  }, [])

  return (
    <Section innerHeight={innerHeight}>
      <Section2_Left_Img isValid={isValid} ref={target}>
        <img src='landingImg/posting.gif'></img>
      </Section2_Left_Img>

      <Section2_Right_Desc>
          <h1>나만아는 장소 공유!</h1>
          <br />
          <p>다른사람들은 잘 모르는 나만의 이야기가 담긴 장소를<br /> 지도와 카테고리별로 분류하고 공유해보세요!</p>
      </Section2_Right_Desc>
    </Section>
  )
}