import React from 'react';
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import {Button, Textarea} from "molecule";

const CreatePostPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <CreateListWrapper>
        <CreateWrapper>
          <input type="file" />
          <CreateBody>
            <Textarea rows={10} placeholder={"내용을 입력하세요"}/>
          </CreateBody>
        </CreateWrapper>
        <div style={{display: 'flex', columnGap: 8}}>
          <Button fluid variant={"outlined"} onClick={() => navigate(-1)}>뒤로가기</Button>
          <Button fluid>게시물 등록</Button>
        </div>
      </CreateListWrapper>
    </>
  )
}

export default CreatePostPage;

const CreateListWrapper = styled.div`
  //max-width: 300px;
`;
const CreateWrapper = styled.div`
  width: 100%;
  //border: 1px solid red;
`;
const PostHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
`;
const PostUser = styled.div`
  display: flex;
  align-items: center;
  
  > p {
    margin-left: 8px;
  }
`;
const CreateBody = styled.div`
  > p {
    padding: 0 16px;
  }
`;
const LikeWrapper = styled.div`
  padding: 10px 16px;
`;
const ProfileImg = styled.img`
  width: 40px;
  border-radius: 10em;
`;
const PostImg = styled.img`
  width: 100%;
`;
