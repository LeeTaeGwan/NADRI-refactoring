import React, { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import {
  ModalBackdrop,
  LoginModalBackdrop,
  LoginModalView,
  ModalLogo,
  ModalHead,
  ModalInput,
  Oauth
} from "./LoginStyled"
import {useDispatch, useSelector} from 'react-redux'
import { loginModal, signupModal, authState, gLogIn, kLogIn, userInfo } from '../../../redux/actions';
import { useNavigate } from "react-router-dom";

import axios from 'axios'
axios.defaults.withCredentials = true;

export default function Login ({setLoginSuccessModal, loginSuccessModal}) {
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  })
  const [dangerMessage, setDangerMessage] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const LoginModalstate = useSelector(state => state.loginReducer);
  const SignupModalstate = useSelector(state => state.signupReducer);
  const curAuthState = useSelector(state => state.changeAuthState);
  const curUserInfo = useSelector(state => state.getUserInfo);
  const gLoginState = useSelector(state => state.gLoginReducer);
  const kLoginState = useSelector(state => state.kLoginReducer);

  function onChange (e) {
    const {name, value} = e.target

    setInputs({
      ...inputs,
      [name]: value
    })
  }

  function postLogin () {
    const {email, password} = inputs
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_URL}/auth/login`,
      headers: {
        accept: 'application/json'
      },
      data: {email, password}
    })
    .then((res) => {
      // console.log(res.data.data)
      const {id, email, nickname, image, admin, oauth, createdAt} = res.data.data
      if(res.status = 200) {
        dispatch(loginModal(LoginModalstate))
        dispatch(authState(curAuthState))
        dispatch(userInfo({id, email, nickname, image, admin, oauth, createdAt}))
        setLoginSuccessModal(!loginSuccessModal)
        navigate('/')
      }
    })
    .catch((err) => {
      if(err.status = 400){
        setDangerMessage('????????? ??????????????????.')
      }
      console.log(err)
    })
  }

  function ModalHandler (e) {
    if(e.target.textContent === '??????????????????!') {
      dispatch(loginModal(LoginModalstate))
      dispatch(signupModal(SignupModalstate))
      return;
    }
    dispatch(loginModal(LoginModalstate))
  }

  const onClickGoogle = async () => {
    // console.log(e)
    await dispatch(loginModal(LoginModalstate))
    await dispatch(gLogIn(gLoginState))
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
    // window.location.href = '/';
  };

  const onClickKakao = async () => {
    await dispatch(loginModal(LoginModalstate))
    await dispatch(kLogIn(kLoginState))
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/kakao`;
  }
  

  function handleKeyPress(e) {
    if(e.key === 'Enter') {
      postLogin()
    }
  }

  return (
    <ModalBackdrop onClick={ModalHandler}>
      <LoginModalView onClick={(e) => e.stopPropagation()}>

        <ModalLogo>
          <div>
            <img className="mainLogo" src="/img/nadri-header-img.png" alt="?????? ??????"/>
            <img className="mobileLogo" src="/img/nadri-logo-small.png" alt="????????? ??????" />
          </div>
        </ModalLogo>

        <ModalHead>
          <span onClick={ModalHandler}>&#x2716;</span>
          <h1>?????????</h1>
          <p>????????? ???????????????? &#xa0;<br/><span onClick={(e) => ModalHandler(e)}>??????????????????!</span></p>
        </ModalHead>

        <ModalInput>
          <form>
            <label htmlFor="email">?????????</label>
            <input autoComplete="off" type={"text"} name="email" onKeyPress={(e) => handleKeyPress(e)} onChange={onChange}></input>
            <label htmlFor="password">????????????</label>
            <input autoComplete="off" type={"password"} name="password" onKeyPress={(e) => handleKeyPress(e)} onChange={onChange}></input>
          </form>
          <span id="dangerMsg">{dangerMessage}</span>
        </ModalInput>
        
        <Oauth>
          <div onClick={postLogin}>
            <div className="normalLogin">?????????</div>
          </div>
          <span onClick={onClickGoogle}>
            {/* <button onClick={onClickGoogle}> */}
            <img className="googlePcLogin" src="/img/btn_google_signin_light_normal_web@2x.png" alt="?????? ?????????" />
            <img className="googleMobile" src="/img/btn_google_light_normal_ios.svg" alt="??????m" />
            {/* </button> */}
          </span>
          <span onClick={onClickKakao}>
            {/* <button onClick={onClickKakao}> */}
            <img className="kakaoPcLogin" src="/img/kakao_login_medium_narrow.png" alt="????????? ?????????" />
            <img className="kakaoMobile" src="/img/kakaolink_btn_small.png" alt="?????????m"/>
            {/* </button> */}
          </span>
        </Oauth>
      </LoginModalView>
    </ModalBackdrop>
  )
}