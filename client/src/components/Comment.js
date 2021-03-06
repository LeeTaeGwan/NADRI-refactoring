import React, {useState} from "react";
import styled from "styled-components";
import { useSelector } from 'react-redux'

const CommentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  justify-content: flex-start;
  /* margin: 5px; */
  border: 1px black;
  padding: 5px 0px;
  /* height: 3em; */
  width: 100%;
`;

const UserImage = styled.img`
  width: 3rem;
  height: 3rem;
  margin-right: 10px;
  border-radius: 70%;
`;

const CommentContentWrapper = styled.div`
  display: flex;
  margin-bottom: 5px;
  width: 100%;
  position: relative;

  .userNickname {
    font-weight: bold;
    padding-right: 5px;
  }

  .editComment {
    /* max-width: 340px; */
    /* height: 6.25em; */
    /* border: none; */
    /* width: 300px; */
    /* width: auto; */
    width: 30vw;
    resize: none;
    height: auto;
    overflow:visible;
  }

  .UserComment {
    line-height: 1.2rem;
    word-break:break-all;
    line-height: 1.2rem;
  }

  @media (max-width:900px){
    .editComment {
      width: 55vw;
    }
  }
`;

const InfoAndAlert = styled.div`
  font-size: smaller;
  color: grey;
  /* padding: 0; */
  .test {
    margin-right: 5px;
  }

  .click {
    cursor: pointer;
  }
`;

export default function Comment({ comment, modComment, delComment }) {

  const curUserInfo = useSelector(state => state.getUserInfo);
  const curAuthState = useSelector(state => state.changeAuthState);
  const [edit, setEdit] = useState(false)
  const handleEdit = () => {
    setEdit(!edit)
  }

  const [text, setText] = useState('')
  const handleText = (event) => {
    setText(event.target.value)
  }

  const sendModComment = ([id, text]) => {
    modComment([id, text])
    setEdit(!edit)
  }

  return (
    <CommentWrapper>
      <UserImage
        src={comment.image} onError={(e) => e.target.src = `/img/gitHubLogo.png`}
      />
      <div>
        <CommentContentWrapper>
          {
            !edit ?
            <div>
              <span className="userNickname">{comment.nickname}</span>
              <span className="UserComment">{comment.comment}</span>
            </div>
            : <textarea className='editComment' defaultValue={comment.comment} onChange={handleText}/>
          }
        </CommentContentWrapper>
        {curAuthState && curUserInfo.admin || curAuthState && curUserInfo.id === comment.userId ?
          <InfoAndAlert>
          <span className='test'>{comment.createdAt}</span>
          {!edit ? 
            <span>
              <span className='test click' onClick={handleEdit}>??????</span>
              <span className='test click' onClick={() => delComment(comment.id)}>??????</span>
            </span>
            :
            <span>
              <span className='test click' onClick={() => sendModComment([comment.id, text])}>??????</span>
              <span className='test click' onClick={handleEdit}>??????</span>
            </span>
          }
        </InfoAndAlert>
        : null}
      </div>
    </CommentWrapper>
  );
}
