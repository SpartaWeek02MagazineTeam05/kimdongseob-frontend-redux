import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import {Button, Radio, Text, Textarea} from "molecule";
import {useRecoilState, useRecoilValue} from "recoil";
import {postAtom, userInfoAtom} from "state";
import axios from "axios";

const CreatePostPage = () => {
  const navigate = useNavigate();
  const [post, setPost] = useRecoilState(postAtom);
  const userInfo = useRecoilValue(userInfoAtom);
  const [contents, setContents] = useState<string>("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [curType, setCurType] = useState<string>("");

  // @ts-ignore
  useEffect(() => {
    preview();
    return () => preview();
  })

  const preview = () => {
    if (!files) {
      return false
    }
    const imgEl = document.querySelector('.img_box');
    const reader = new FileReader();
    // @ts-ignore
    reader.onload = () => (imgEl.style.backgroundImage = `url(${reader.result})`);
    reader.readAsDataURL(files[0]);

  }

  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContents(e.target.value);
  };
  const handleChangeType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurType(e.target.value);
    console.log(e.target.value)
  }
  const createPost = async () => {
    if (contents === "") {
      alert("내용을 입력해 임마");
      return;
    }

    const formData = new FormData();
    if (files) {
      formData.append('uploadImage', files[0])
    }
    console.log(files);
    const config = {
      Headers: {
        'content-type': 'multipart/form-data',
      },
    };
    const data = {
      nickName: userInfo.nickName,
      contents: contents,
      image: files && files[0].name,
      type: curType
    }
    // @ts-ignore
    await axios.post(' http://localhost:3001/post', data, config)
      .then((res) => {
        setPost({
          nickName: data.nickName,
          contents: data.contents,
          image: data.image,
          type: data.type
        });
        navigate("/");
        return res.data.result;
      })
      .catch(() => alert("게시물 등록 실패"));
  }

  const onLoadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files;
    setFiles(file);
  }

  return (
    <>
      <CreateListWrapper>
        <CreateWrapper>
          <div className="img_box" style={{height: 200, border: '1px solid #ddd'}}/>
          <form>
            <input type="file" id="image" accept="img/*" onChange={onLoadFile}/>
            <label htmlFor="image">파일선택</label>
          </form>
          <CreateBody>
            <Textarea rows={10} placeholder={"내용을 입력하세요"} onChange={handleChangeContent}/>
          </CreateBody>
          <SelectTypeWrapper style={contents === "" ? {opacity: 0.5, pointerEvents: 'none'} : undefined}>
            <Text>레이아웃을 선택해주세요</Text>
            <SelectTypeInner>
              <Radio id={"full"} name={"type"} value={"full"} label={"이미지 상"} onChange={handleChangeType}/>
              <Radio id={"left"} name={"type"} value={"left"} label={"이미지 좌"} onChange={handleChangeType}/>
              <Radio id={"right"} name={"type"} value={"right"} label={"이미지 우"} onChange={handleChangeType}/>
            </SelectTypeInner>
          </SelectTypeWrapper>
        </CreateWrapper>
        <div style={{display: 'flex', columnGap: 8}}>
          <Button fluid variant={"outlined"} onClick={() => navigate(-1)}>뒤로가기</Button>
          <Button
            fluid
            onClick={createPost}
            style={curType === "" ? {opacity: 0.5, pointerEvents: 'none'} : undefined}
          >
            게시물 등록
          </Button>
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
const CreateBody = styled.div`
  > p {
    padding: 0 16px;
  }
`;
const SelectTypeInner = styled.div`
  display: flex;

  > div {
    margin-left: 16px;

    &:first-child {
      margin-left: 0;
    }
  }
`;
const SelectTypeWrapper = styled.div`
  padding: 1rem;
  background-color: ${({theme}) => theme.colors.gray200};
  border-radius: 8px;
  margin: 1rem 0;

  > div {
    margin-top: 1rem;
  }
`;