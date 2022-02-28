import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import pageList from "../../pageList";
import {RootState} from "state";
import {Text} from 'molecule';
import {PostCardView} from "../../components";
import {IoMdCreate} from 'react-icons/io';
import {useDispatch, useSelector} from "react-redux";
import {deletePost, getPostList, likePost} from "../../state/modules/PostKit";
import {CreateBtn, CreateBtnDisabled, CreateBtnWrapper, PostListWrapper} from './style';

const PostListPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const postList = useSelector((state: RootState) => state.post.postList)
  const myLike = useSelector((state: RootState) => state.post.myLike)
  const {username, nickName} = useSelector((state: RootState) => state.user.userInfo)
  const isLogin = useSelector((state: RootState) => state.user.isLogin)
  const [num, setNum] = useState<number>(0);

  useEffect(() => {
    dispatch(getPostList())
  }, [num])
  const moveCreatePage = () => {
    navigate(`/${pageList.createPost}`);
  };

  const handleClickModify = (postId: string | number) => {
    navigate(`/${pageList.editPost}/${postId}`);
  };

  const handleClickLike = (postId: string | number) => {
    const data = {
      postId: postId,
      userId: localStorage.getItem("userId")
    }
    dispatch(likePost({data, navigate}))
    console.log("좋아요 클릭")
  }

  const handleClickRemove = (postId: string | number) => {
    dispatch(deletePost(postId))
    setNum(num + 1);

  }
  const likeCheck = (postId: string | number) => {
    if (localStorage.getItem("userId")) {
      const isLike = myLike.filter((like) => like.postId === postId);
      return isLike.length > 0;
    }
  }

  const handleClickDetail = (postId?: number) => {
    if (postId) {
      navigate(`/${pageList.detailPost}/${postId}`);
    } else {
      console.log("수정 불가능해");
    }
  };
  console.log("postList", postList);
  return (
    <>
      <PostListWrapper>
        {postList.length > 0 ? postList.map((post: any, idx: number) => (
          <PostCardView
            key={idx}
            post={post}
            onClickModify={() => handleClickModify(post.id)}
            onClickLike={() => handleClickLike(post.id)}
            onClickRemove={() => handleClickRemove(post.id)}
            onClickDetail={() => handleClickDetail(post.id)}
            like={likeCheck(post.id)}
            isPossibleModify={post.nickName === nickName}
            type={post.type}
          />)) : <Text>게시물이 없어요~</Text>
        }

      </PostListWrapper>
      <CreateBtnWrapper>
        {isLogin ?
          <CreateBtn onClick={moveCreatePage}>
            <div>
              <IoMdCreate/>
            </div>
          </CreateBtn>
          : <CreateBtnDisabled>
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