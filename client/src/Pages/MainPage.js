/*global kakao */
import React from "react";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
// import dummy from "../assets/dummy";
import Item from "../components/MainPage/Item";
import { Link } from "react-router-dom";
import axios from 'axios'
// import DetailPage from "./DetailPage";

const MainContainer = styled.div`
  height: 100%;
  padding: 3rem 9vw;
  display: flex;
  justify-content: space-between;
  font-family: 'NanumSquare', 'Cafe24', arial;

  #map {
    width: 45rem;
    height: 50rem;
    border-radius: 15px;
    z-index: 0;
  }

  .contentContainer {
    width: 45rem;
    height: 50rem;
    padding: 0 3rem 1rem;
  }
  @media screen and (max-width: 1380px) {
    display: flex;
    flex-direction: column;
    
    #map {
      width: 100%;
      height: 30rem;
      margin-bottom: 30px;
    }

    .contentContainer {
      width: 100%;
      padding: 0;
    }
  }
`

const ContentNav = styled.nav`
  border: 1px solid black;
  border-radius: 30px;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items:center;
  padding: 0 2rem;
  margin-bottom: 3rem;
  cursor: grab;

  #type {
    font-family: 'NanumSquare', 'Cafe24', arial;   
    :hover{
      color: #ff7400;
    } 
  }
  #categoryId {
    font-family: 'NanumSquare', 'Cafe24', arial;
    :hover{
      color: #005582;
    } 
  }

  > select {
    height: 2rem;
    border-radius: 3px;
    background-color: white;
  }
`

const ItemContainer = styled.div`
  height: 44rem;
  border: 1px solid black;
  overflow: auto;
  padding: 1rem;
  border-radius: 10px;
  
  &::-webkit-scrollbar{
    width: 10px;
  }

  &::-webkit-scrollbar-thumb{
      height: 17%;
      background-color: #d3d3d3;
      border-radius: 10px;    
  }

  &::-webkit-scrollbar-track{
      background-color: rgba(0,0,0,0);
  }

  @media screen and (max-width: 1380px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`

export default function Main () {

  const [origPost, setOrigPost] = useState([])
  const [points, setPoints] = useState([])
  const handlePoints = (data) => {
    setPoints(data)
  }

  // 옵션은 [type, categoryId] 형식으로 저장
  const [option, setOption] = useState(['distance', 5])

  const optionHandler = (e) => {
    if (e.target.id === 'type') setOption([e.target.value, option[1]])
    else setOption([option[0], Number(e.target.value)])
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log('위치 확인에 성공하였습니다.')
      kakaoInit([position.coords.latitude, position.coords.longitude], true)
    }, (error) => {
      console.log('현재 위치 확인이 불가한 상황입니다.')
      kakaoInit([37.5655493, 126.9777104], false)
    })
  }, []);

  useEffect(() => {
    // console.log('=====test=====')
    // 페이지 로드 시 post정보가 []일때(아직 로딩이 안된 상태) 작동하지 않게
    if (!points.length) return null

    console.log('=====test=====')

    // 여기서 기준을 뭘로 할지를 정해야 함
    // 사실 option 변경되면 작동하니 별 상관은 없을듯

    // 우선 필터 대상부터 걸러내기
    // categoryId가 1이면 전부 통과해야 함
    let sortTarget = [...origPost]
    if (option[1] === 5) sortTarget = [...origPost]
    else sortTarget = sortTarget.filter(e => e.categoryId === option[1])

    sortTarget = sortTarget.sort((a, b) => {
      return a[`${option[0]}`] - b[`${option[0]}`]
    })

    if (option[0] === 'id' || option[0] === 'likes') {
      console.log('큰값이 앞으로')
      sortTarget.reverse()
    }

    setPoints(sortTarget)

  }, [option])

  const kakaoInit = async ([lat, lng]) => {
    // 지도 생성
    const map = new kakao.maps.Map(document.getElementById('map'), {
      center: new kakao.maps.LatLng(lat, lng),
      level: 7,
    });
    map.addControl(
      new kakao.maps.ZoomControl(),
      kakao.maps.ControlPosition.RIGHT
    );

    // 마커 생성
    let marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(lat, lng),
    });
    // 마커를 지도에 표시
    marker.setMap(map);

    // 모든 게시글 정보를 수신해 거리순으로 정렬
    const postData = await axios.get(`${process.env.REACT_APP_API_URL}/post`)
    let sortTarget = [...postData.data.data]

    const startLatLng = new kakao.maps.LatLng(lat, lng)
    sortTarget.map(e => {
      const polyline = new kakao.maps.Polyline({
        path: [startLatLng, new kakao.maps.LatLng(e.lat, e.lng)]
      });
      e['distance'] = polyline.getLength()
    })

    sortTarget.sort((a, b) => {
      return a.distance - b.distance
    })

    handlePoints(sortTarget)
    setOrigPost(sortTarget)

    const points = []
    
    postData.data.data.map(e => {
      const {title, lat, lng} = e
      points.push({title, latlng: new kakao.maps.LatLng(lat, lng)})
    })
    const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
    const imageSize = new kakao.maps.Size(24, 35)
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize)

    for (let i of points) {
      // console.log(i);
      const marker = new kakao.maps.Marker({
        map,
        position: i.latlng,
        // title: i.title,
        image: markerImage,
      });

      // 인포윈도우 추가하기
      // 마우스 오버될 때 표시할 인포윈도우
      // 여기 컴포넌트 들어가려나?
      // const iwContent = `<div style="padding:5px;">${i.title.length > 10 ? i.title.slice(0, 9) + '...' : i.title }</div>`;
      const testImgUrl = 'https://nadri.s3.ap-northeast-2.amazonaws.com/6131642483890263.jpeg'
      const iwContent = `
      <div>
        <div style="padding:5px;">${i.title.length > 10 ? i.title.slice(0, 9) + '...' : i.title }</div>
        <div"><img src='${testImgUrl}' /></div>
      </div>
      `;
      
      const infowindow = new kakao.maps.InfoWindow({
        content : iwContent
      });

      // 마커에 마우스오버 이벤트를 등록합니다
      kakao.maps.event.addListener(marker, 'mouseover', function() {
        // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
          infowindow.open(map, marker);
      });

      // 마커에 마우스아웃 이벤트를 등록합니다
      kakao.maps.event.addListener(marker, 'mouseout', function() {
          // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
          infowindow.close();
      });
    }
  }

  return (
    <MainContainer>
      <div id="map" />

      <div className="contentContainer">
        <ContentNav>
          <span>정렬방식</span>
          <span>
            <select id='type' onChange={optionHandler}>
              <option value='distance'>거리순</option>
              <option value='likes'>좋아요</option>
              <option value='id'>최신순</option>
            </select>
            <select id='categoryId' onChange={optionHandler}>
              <option value={5}>전체</option>
              <option value={1}>여행</option>
              <option value={2}>카페</option>
              <option value={3}>맛집</option>
              <option value={4}>산책</option>
            </select>
          </span>
        </ContentNav>

          <ItemContainer>
            {points.length > 0 ? points.map((point) => <Item key={point.id} point={point}/>) : null}
          </ItemContainer>
      </div>
    </MainContainer>
  )
}