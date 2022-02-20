import React from 'react';
import {useNavigate} from "react-router-dom";
import pageList from "../pageList";
import styled from "styled-components";
import {useRecoilValue} from "recoil";
import {selectorPost} from "../state/Post";
import {Text, Button} from 'molecule';

const PostListPage = () => {
  const postList = useRecoilValue(selectorPost)
  const navigate = useNavigate();
  const handleClickCreate = () => {
    navigate(`/${pageList.createPost}`)
  }

  return (
    <>
      <PostListWrapper>
        {postList.map((post: any, idx: number) => (
          <PostWrapper key={idx}>
            <PostHeader>
              <PostUser>
                <ProfileImg src={post.image}/>
                <Text>{post.userId}</Text>
              </PostUser>
              <Text>00시간 전</Text>
            </PostHeader>
            <PostBody>
              <PostImg src={"/kakao.jpg"}/>
              <Text>{post.contents}</Text>
              <LikeWrapper>
                <Button>좋아요 버튼</Button>
                <Text>likes : {post.like}</Text>
              </LikeWrapper>
            </PostBody>
          </PostWrapper>
        ))}

        <button onClick={handleClickCreate}>게시글 작성</button>
      </PostListWrapper>
    </>
  )
}

export default PostListPage;

const PostListWrapper = styled.div`
  //max-width: 300px;
`;
const PostWrapper = styled.div`
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
const PostBody = styled.div`
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
