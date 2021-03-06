import './App.css'
import Header from './components/Header';
import Body from './components/Body'
import Footer from './components/Footer';
import Login from './components/Modals/LoginModal/Login'
import Signup from './components/Modals/SignupModal/Signup'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { authState, userInfo } from './redux/actions'
import { useNavigate } from "react-router-dom";
import Landing from './Pages/Landing';
import { Routes, Route, Navigate, BrowserRouter, Link, Switch } from 'react-router-dom';
import SuccessSignupModal from './components/Modals/SignupModal/SuccessSignupModal';
import SuccessLoginModal from './components/Modals/LoginModal/SuccessLoginModal'

// axios.defaults.withCredentials = true;

function App() {
  
  const LoginModalstate = useSelector(state => state.loginReducer);
  const SignupModalstate = useSelector(state => state.signupReducer);
  const curAuthState = useSelector(state => state.changeAuthState);
  const curUserInfo = useSelector(state => state.getUserInfo);
  const store = useSelector(state => state)
  // console.log(store)
  // console.log('app.js의 시작 로그인 상태 :'+curAuthState)

  const gLoginState = useSelector(state => state.gLoginReducer)
  const kLoginState = useSelector(state => state.kLoginReducer)
  const LoginState = useSelector(state => state.changeAuthState)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // 소셜 로그인을 위한 코드(일부 추후 수정 작업 필요)
  const url = new URL(window.location.href)
  // console.log(url)
  const [authorizationCode, setAuthorizationCode] =useState(url.searchParams.get('code'))
  const [accessToken, setAccessToken] = useState(null)

  // useEffect(() => { 새로고침 스크롤 TOP
  //   window.onbeforeunload = function pushRefresh() {
  //     window.scrollTo(0, 0);
  //   };
  // }, []);

  // Oauth 로그인을 위한 useEffect
  useEffect(() => {
    if(authorizationCode){
      // console.log(authorizationCode)
      // console.log('구글 로그인 클릭 상태: '+gLoginState)
      // console.log('카카오 로그인 클릭 상태: '+kLoginState)

      if(gLoginState===true){
        getGoogleAccessToken(authorizationCode)
      }
      if(kLoginState===true){
        getKakaoAccessToken(authorizationCode)
      }
    }
  }, [])


  const getGoogleAccessToken = async (authorizationCode) => {
    //! 서버의 해당 엔드포인트로 authorization code를 보내주고 access token을 받아옴
    await axios
    .post(`${process.env.REACT_APP_API_URL}/auth/googleCallback`, { // 서버 배포시 url 수정 필요(환경 변수)
      authorizationCode
    })
    .then((result) => {
      // console.dir(result)
      const {id, email, nickname, image, admin, oauth, createdAt} = result.data.data
      setAccessToken(result.data.accessToken)
      dispatch(authState(curAuthState))
      dispatch(userInfo({id, email, nickname, image, admin, oauth, createdAt}))
      // console.log(curAuthState)
      navigate('/')

    })
    .catch((err) => {
      console.log('구글 get액세스토큰 catch Err')
    })
  }

  const getKakaoAccessToken = async (authorizationCode) => {
    await axios.post(`${process.env.REACT_APP_API_URL}/auth/kakaoCallback`, {
      authorizationCode
    })
    .then((result) =>{
      // console.dir(result)
      const {id, email, nickname, image, admin, oauth, createdAt} = result.data.data
      setAccessToken(result.data.accessToken)
      dispatch(authState(curAuthState))
      dispatch(userInfo({id, email, nickname, image, admin, oauth, createdAt}))
      // console.log(curAuthState)
      navigate('/')
    })
    .catch((err) => {
      console.log('카카오 get액세스토큰 catch Err')
    })
  }
  const [signupSuccessModal, setSignupSuccessModal] = useState(false)
  const [loginSuccessModal, setLoginSuccessModal] = useState(false)
  // console.log(loginSuccessModal)
  // console.log('구글 로그인 클릭 상태: '+gLoginState)
  const landingUrl = window.location.href.slice(-7)
  return (
    <div className="App">

      {
        landingUrl === 'landing' ?
          <Landing />
        :
        <>
          <Header />
          <Body />
          <Footer />
        </>
      }
      
      {
        LoginModalstate ? <Login loginSuccessModal={loginSuccessModal} setLoginSuccessModal={setLoginSuccessModal}/>
        : ''
      }
      {
        SignupModalstate ? <Signup setSignupSuccessModal={setSignupSuccessModal} signupSuccessModal={signupSuccessModal} />
        : ''
      }
      {
        signupSuccessModal ? <SuccessSignupModal loginSuccessModal={loginSuccessModal} setLoginSuccessModal={setLoginSuccessModal} />
        : ''
      }
      {
        loginSuccessModal  ? <SuccessLoginModal loginSuccessModal={loginSuccessModal} setLoginSuccessModal={setLoginSuccessModal} />
        : ''
      }
    </div>
  );
}

export default App;
