import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import pageList from "../pageList";
import styled from "styled-components";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {editPostIdAtom, selectorPost, userInfoAtom} from "state";
import {Text, Button} from 'molecule';
import axios from "axios";
import {PostCardView} from "../components";
import {IoMdCreate} from 'react-icons/io';

const PostListPage = () => {
  const postList = useRecoilValue(selectorPost);
  const userInfo = useRecoilValue(userInfoAtom);
  const setEditPostId = useSetRecoilState(editPostIdAtom);
  const [like, setLike] = useState<boolean>(false);
  // const [postList, setPostList] = useState([]);
  const navigate = useNavigate();
  const handleClickCreate = () => {
    navigate(`/${pageList.createPost}`);
  };

  const handleClickModify = (postNickName: string, postId?: number) => {
    const userId = document.cookie.split("=").pop();
    if ((postNickName === userId) && postId) {
      console.log("수정가능해!");
      setEditPostId(postId);
      navigate(`/${pageList.editPost}/${postId}`);
    } else {
      console.log("수정 불가능해");
    }
  };

  const possibleModify = () => {
    return document.cookie.split("=").pop();
  }

  const handleClickLike = async (postId: string | number) => {
    setLike(!like);
    console.log(userInfo.username);
    console.log(userInfo.nickName);
    await axios
      .post('http://localhost:3001/like', {
        postId: postId,
        userId: userInfo.username
      })
      .then((res) => {
        if (res.data.result) {
          return alert("좋아요 성공!")
        } else {
          return alert("좋아요 취소ㅠㅠ")
        }
      })
      .catch((err) => {
        alert("에러에러에러ㅔ어레어렝");
        console.log(err);
      });
  }

  // useEffect(() => {
  //   getPost()
  // }, []);
  //
  // const getPost = async () => {
  //   await axios.get('http://localhost:3001/post')
  //     .then((res) => {
  //       return setPostList(res.data)
  //     })
  //     .catch(() => console.log('asdkjfhalksjdhf'))
  // }

  return (
    <>
      <PostListWrapper>
        {postList.length > 0 ? postList.map((post: any, idx: number) => (
          <PostCardView
            key={idx}
            post={post}
            onClickModify={() => handleClickModify(post.nickName, post.id)}
            onClickLike={() => handleClickLike(post.id)}
            like={like}
            isPossibleModify={post.nickName === possibleModify()}
            type={post.type}
          />)) : <Text>게시물이 없어요~</Text>
        }

      </PostListWrapper>
      <CreateBtnWrapper>
        {userInfo.nickName ?
          <CreateBtn onClick={handleClickCreate}>
            <div>
              <IoMdCreate/>
            </div>
          </CreateBtn>
          : <CreateBtnDisabled onClick={handleClickCreate}>
            <div>
              <IoMdCreate/>
            </div>
          </CreateBtnDisabled>
        }
      </CreateBtnWrapper>
    </>
  )
}

export default PostListPage;

const PostListWrapper = styled.div`
  //position: relative;
`;
const CreateBtnWrapper = styled.div`
  position: absolute;
  bottom: 3rem;
  right: 3rem;
  //transform: translateX(400px);
`;
const CreateBtn = styled.div`
  width: 50px;
  height: 50px;
  font-size: 1.5rem;
  color: ${({theme}) => theme.colors.primary};
  border:1px solid ${({theme}) => theme.colors.primary};
  border-radius: 10em;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor:pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({theme}) => theme.colors.primary};
    color: ${({theme}) => theme.colors.white};
    transition: all 0.2s ease;
  }
`;

const CreateBtnDisabled = styled.div`
  width: 50px;
  height: 50px;
  font-size: 1.5rem;
  color: ${({theme}) => theme.colors.gray400};
  border:1px solid ${({theme}) => theme.colors.gray400};
  border-radius: 10em;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  transition: all 0.2s ease;
`;