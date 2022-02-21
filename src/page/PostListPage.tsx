import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import pageList from "../pageList";
import styled from "styled-components";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {editPostIdAtom, editPostIdSelector, selectorPost} from "state";
import {Text, Button} from 'molecule';

const PostListPage = () => {
  const postList = useRecoilValue(selectorPost);
  const setEditPostId = useSetRecoilState(editPostIdAtom);
  const navigate = useNavigate();
  const handleClickCreate = () => {
    navigate(`/${pageList.createPost}`);
  };
  const handleClickModify = (postUserId: string, postId?: number) => {
    const userId = document.cookie.split("=").pop();
    if (postUserId === userId && postId) {
      console.log("수정가능해!");
      setEditPostId(postId);
      navigate(`/${pageList.editPost}/${postId}`);
    } else {
      console.log("수정 불가능해");
    }
  };
  useEffect(() => {
    return postList
  });
  return (
    <>
      <PostListWrapper>
        {postList.length > 0 ? postList.map((post: any, idx: number) => (
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
                  <Button onClick={() => handleClickModify(post.userId, post.id)}>수정</Button>
                  <Button>좋아요 버튼</Button>
                  <Text>likes : {post.like}</Text>
                </LikeWrapper>
              </PostBody>
            </PostWrapper>
          ))
          : <Text>게시물이 없어요~</Text>
        }

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
