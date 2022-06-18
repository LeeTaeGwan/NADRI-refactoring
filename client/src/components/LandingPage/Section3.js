import React, {useState, useRef, useEffect} from "react";
import styled, {css, keyframes} from "styled-components";

const showImg = keyframes`
  0% {
    transform: translate(-200px, -200px);
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

const Desc = styled.div`
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
`

const Img = styled.div`
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
          animation-name: ${showImg};
          animation-duration: 1s;
          animation-timing-function: ease-in-out;
        `)
      }
    }}

  @media (max-width: 992px) {
    height: 50%
  }
`

export default function Section3({innerHeight}) {
  const [isValid, setIsValid] = useState(false)
  const target = useRef(null)

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  }

  const io = new IntersectionObserver(([{isIntersecting}]) => {
    setIsValid(isIntersecting)
  }, options)
  
  useEffect(() => {
    io.observe(target.current)
  }, [])

  return (
    <Section innerHeight={innerHeight}>
        <Desc>
          <h1>좋아요 기능을 사용하여 가고싶은 곳을 저장하세요!</h1>

          <p>마음에드는 게시글에 좋아요를 눌러 즐겨찾기에 저장해보세요!</p>
        </Desc>

        <Img isValid={isValid} ref={target}>
          <img src='landingImg/like.gif'></img>
        </Img>
      </Section>
  )
}