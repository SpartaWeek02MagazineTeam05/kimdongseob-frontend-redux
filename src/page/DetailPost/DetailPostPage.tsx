import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Button, Text} from "molecule";
import {RootState} from "state";
import {useSelector} from "react-redux";
import {Body, CreateListWrapper, CreateWrapper} from './style'

const DetailPostPage = () => {
  const navigate = useNavigate();
  const param = useParams();
  const postList = useSelector((state: RootState) => state.post.postList);

  const post = postList.filter((post: any) => post.id === Number(param.postId))[0];
  return (
    <>
      <CreateListWrapper>
        <CreateWrapper>
          <img className="img_box" style={{height: 200, border: '1px solid #ddd'}} src={post.image}/>
          <Body>
            <Text style={{whiteSpace: 'pre-wrap'}}>{post.contents}</Text>
          </Body>
        </CreateWrapper>
        <div style={{display: 'flex', columnGap: 8}}>
          <Button fluid variant={"outlined"} onClick={() => navigate("/", {replace: true})}>뒤로가기</Button>
        </div>
      </CreateListWrapper>
    </>
  )
}

export default DetailPostPage;
