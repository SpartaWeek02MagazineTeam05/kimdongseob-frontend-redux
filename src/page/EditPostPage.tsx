import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import {Button, Text, Textarea} from "molecule";
import {useRecoilState, useRecoilValue} from "recoil";
import {editPostIdAtom, editPostIdSelector, postAtom, userInfoAtom} from "state";
import axios from "axios";

const EditPostPage = () => {
  const navigate = useNavigate();
  const [post, setPost] = useRecoilState(postAtom);
  const userInfo = useRecoilValue(userInfoAtom);
  const editPostId = useRecoilValue(editPostIdAtom);
  const editPost = useRecoilValue(editPostIdSelector);
  const [contents, setContents] = useState<string>("");
  // const [post, setPost] = useState("");

  useEffect(() => {
  console.log("editPostId: ",editPostId);
  console.log("editPost: ",editPost);
  }, []);

  console.log("editPost: ",editPost);

  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContents(e.target.value);
  };
  const createPost = async () => {
    if( contents === "") {
      alert("내용을 입력해 임마");
      return;
    }
    const data = {
      nickName: userInfo,
      contents: contents,
      image: 'none',
      type: 'none'
    }
    await axios.post(' http://localhost:3001/post', data)
      .then((res) => {
        setPost({
          nickName: data.nickName,
          contents: data.contents,
          image: data.image,
          type: data.type
        });
        return res.data.result;
      })
      .catch(() => alert("게시물 등록 실패"));
    await navigate("/");
  }

  return (
    <>
      <CreateListWrapper>
        <CreateWrapper>
          <input type="file"/>
          <CreateBody>
            <Textarea rows={10} placeholder={"내용을 입력하세요"} onChange={handleChangeContent} />
          </CreateBody>
          <Text>레리아웃 모양을 선택하세요ddd</Text>
        </CreateWrapper>
        <div style={{display: 'flex', columnGap: 8}}>
          <Button fluid variant={"outlined"} onClick={() => navigate(-1)}>뒤로가기</Button>
          <Button fluid onClick={createPost}>게시물 등록</Button>
        </div>
      </CreateListWrapper>
    </>
  )
}

export default EditPostPage;

const CreateListWrapper = styled.div`
  //max-width: 300px;
`;
const CreateWrapper = styled.div`
  width: 100%;
  //border: 1px solid red;
`;
const CreateBody = styled.div`
  > p {
    padding: 0 16px;
  }
`;