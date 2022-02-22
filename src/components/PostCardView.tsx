import {Button, Text} from "../molecule";
import React, {MouseEventHandler} from "react";
import styled from "styled-components";
import {AiOutlineHeart} from 'react-icons/ai';
import {AiFillHeart} from 'react-icons/ai';

interface Props {
  post?: any;
  onClickModify?: MouseEventHandler;
  onClickLike?: MouseEventHandler;
  like?: boolean;
  isPossibleModify?: boolean;
  type?: "full" | "left" | "right"
}

const PostCardView: React.FC<Props> = (
  {
    post,
    onClickModify,
    onClickLike,
    isPossibleModify,
    like,
    type
  }) => {
  return (
    <PostWrapper>
      <PostHeader>
        <PostUser>
          <ProfileImg src={"/kakao.jpg"}/>
          <Text>{post.nickName}</Text>
        </PostUser>
        <CreateAtText>00시간 전</CreateAtText>
      </PostHeader>
      <PostBody>
        <PostTypeView type={type}>
          <PostImg src={"/kakao.jpg"}/>
          <Text style={{whiteSpace: 'pre-wrap'}}>{post.contents}</Text>
        </PostTypeView>
        {isPossibleModify &&
        <ModifyBtn>
          <Button variant={"outlined"} onClick={onClickModify}>수정</Button>
          <Button variant={"outlined"}>삭제</Button>
        </ModifyBtn>
        }
        <LikeWrapper>
          <SecondaryText>{like ? post.likeCount + 1 : post.likeCount} 명이 좋아합니다</SecondaryText>
          {like ? <LikeBtn onClick={onClickLike}><AiFillHeart/></LikeBtn>
            : <LikeBtn onClick={onClickLike}><AiOutlineHeart/></LikeBtn>
          }
        </LikeWrapper>
      </PostBody>
    </PostWrapper>
  )
}
export default PostCardView;

const ModifyBtn = styled.div`
  //color: ${({theme}) => theme.colors.secondary};
  margin: 1rem 1rem 0 1rem;;
  display: flex;
  justify-content: flex-end;
  column-gap: 0.5rem;
`;

const SecondaryText = styled.div`
  color: ${({theme}) => theme.colors.secondary};
`;

const CreateAtText = styled.div`
  color: ${({theme}) => theme.colors.secondary};
`;

const LikeBtn = styled.div`
  font-size: 2rem;
  color: ${({theme}) => theme.colors.red};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PostWrapper = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  border-radius: 8px;
  background-color: ${({theme}) => theme.colors.grayBg};
`;
const PostTypeView = styled.div<Props>`
  padding: 0 1rem;
  display: ${({type}) => (type === "left" || type === "right") && "flex"};
  flex-direction: ${({type}) => type === "right" && "row-reverse"};
  column-gap: ${({type}) => (type === "left" || type === "right") && "16px"};
  align-items: ${({type}) => (type === "left" || type === "right") && "center"};
  
  > img {
    width: ${({type}) => (type === "left" || type === "right") && "50%"};
  }
  
  > p {
    word-break: break-all;
    margin-top: ${({type}) => type === "full" && "1rem"};
    width: ${({type}) => (type === "left" || type === "right") && "50%"};
    text-align: ${({type}) => type === "right" && "right"};
  }
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  
`;
const ProfileImg = styled.img`
  width: 40px;
  border-radius: 10em;
`;
const PostImg = styled.img`
  width: 100%;
`;