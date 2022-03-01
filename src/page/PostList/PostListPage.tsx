import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import pageList from "../../pageList";
import {RootState} from "state";
import {Text} from 'molecule';
import {PostCardView} from "../../components";
import {IoMdCreate} from 'react-icons/io';
import {useDispatch, useSelector} from "react-redux";
import {deletePost, getPostList, likePost} from "../../state/modules/PostKit";
import {CreateBtn, CreateBtnDisabled, CreateBtnWrapper, PostListWrapper} from './style';
import {debounce, throttle} from 'lodash';

const PostListPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const postList = useSelector((state: RootState) => state.post.postList)
  const myLike = useSelector((state: RootState) => state.post.myLike)
  const {username, nickName} = useSelector((state: RootState) => state.user.userInfo)
  const isLogin = useSelector((state: RootState) => state.user.isLogin)
  const [num, setNum] = useState<number>(0);


  const [preItem, setPreItem] = useState(0)
  const [item, setItem] = useState(5)


  let bodyWrapper: any = document.querySelector("#scroll-body-wrapper");
  useEffect(() => {
    dispatch(getPostList({preItem, item}))
    window.addEventListener('scroll', debounceScroll, true);
  }, [num, item, bodyWrapper]);

  const debounceScroll = debounce(() => {
    let clientHeight = document.documentElement.clientHeight;
    let scrollTop = bodyWrapper.scrollTop;
    let scrollHeight = bodyWrapper.scrollHeight;
    if (scrollTop + clientHeight === scrollHeight) {
      setPreItem(0);
      setItem(item + 5);
    }
  }, 500);


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
    };
    dispatch(likePost({data, navigate}))
    console.log("좋아요 클릭")
  };

  const handleClickRemove = (postId: string | number) => {
    dispatch(deletePost(postId))
    setNum(num + 1);
  };

  const likeCheck = (postId: string | number) => {
    if (localStorage.getItem("userId")) {
      const isLike = myLike.filter((like) => like.postId === postId);
      return isLike.length > 0;
    }
  };

  const handleClickDetail = (postId?: number) => {
    if (postId) {
      navigate(`/${pageList.detailPost}/${postId}`);
    } else {
      console.log("수정 불가능해");
    }
  };

  // const [infoArray, setInfoArray] = useState([]);
  //
  // // ref
  // const observerRef = useRef<IntersectionObserver>();
  // const boxRef = useRef<HTMLDivElement>();
  //
  // // useEffect
  // useEffect(() => {
  //   observerRef.current = new IntersectionObserver(intersectionObserver);
  //   boxRef.current && observerRef.current.observe(boxRef.current);
  // }, [postList]);
  //
  // //function
  //
  // //intersectionObserver setting
  // const intersectionObserver = (entries: IntersectionObserverEntry[], io:IntersectionObserver) => {
  //   entries.forEach((entry) => {
  //     if(entry.isIntersecting) {
  //       io.unobserve(entry.target);
  //       dispatch(getPostList())
  //     }
  //   })
  // }

  // const [target, setTarget] = useState(null);
  // const [itemLists, setItemLists] = useState([1]);
  //
  // useEffect(() => {
  //   console.log(itemLists);
  // }, [itemLists]);
  //
  // const getMoreItem = async () => {
  //   // setIsLoaded(true);
  //   // await new Promise((resolve) => setTimeout(resolve, 1500));
  //   // let Items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  //   setItemLists((itemLists) => itemLists.concat(postList));
  //   // setIsLoaded(false);
  // };
  // const onIntersect = async ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
  //   if (entry.isIntersecting) {
  //     observer.unobserve(entry.target);
  //     await getMoreItem();
  //     observer.observe(entry.target);
  //   }
  // };
  //
  // useEffect(() => {
  //   let observer: any;
  //   if (target) {
  //     observer = new IntersectionObserver(onIntersect, {
  //       threshold: 0.4,
  //     });
  //     observer.observe(target);
  //   }
  //   return () => observer && observer.disconnect();
  // }, [target]);

  return (
    <>
      <PostListWrapper>
        {postList.length > 0 ? postList.map((post: any, idx: number) => {
          return (
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
            />
          )
        }) : <Text>게시물이 없어요~</Text>
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