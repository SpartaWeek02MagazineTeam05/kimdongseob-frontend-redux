import React from 'react';
import {useNavigate} from "react-router-dom";
import styled from "styled-components";

const CreatePostPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <PostListWrapper>
        <PostWrapper>
          <PostHeader>
            <PostUser>
              <ProfileImg src={'/kakao.jpg'}/>
              <div>USERNAME</div>
            </PostUser>
            <div>00시간 전</div>
          </PostHeader>
          <PostBody>
            <div>코멘트 코멘트</div>
            <div>이미지 이미지</div>
            <LikeWrapper>
              <div>좋아요</div>
              <button>좋아요 버튼</button>
            </LikeWrapper>
          </PostBody>
        </PostWrapper>
      </PostListWrapper>
    </>
  )
}

export default CreatePostPage;

const PostListWrapper = styled.div`
  max-width: 300px;
`;
const PostWrapper = styled.div`
  width: 100%;
  border: 1px solid red;
  padding: 16px;
`;
const PostHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const PostUser = styled.div`
  display: flex;
  align-items: center;
`;
const PostBody = styled.div`
`;
const LikeWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const ProfileImg = styled.img`
  width: 50px;
`;
