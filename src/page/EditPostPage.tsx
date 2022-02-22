import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import {Button, Radio, Text, Textarea} from "molecule";
import {useRecoilState, useRecoilValue} from "recoil";
import {editPostIdAtom, userInfoAtom} from "state";
import axios from "axios";

const EditPostPage = () => {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userInfoAtom);
  const editPostId = useRecoilValue(editPostIdAtom);
  const [contents, setContents] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [curType, setCurType] = useState<string>("");
  const [prevType, setPrevType] = useState<string>();
  const [modifiedData, setModifiedData] = useState({})

  useEffect(() => {
    console.log("editPostId: ", editPostId);
    getPost().then(r => r);
  }, []);

  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContents(e.target.value);
  };

  const handleChangeType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurType(e.target.value);
  }
  const editPost = async () => {
    if (contents === "") {
      alert("내용을 입력해 임마");
      return;
    }
    const data = {
      nickName: userInfo.nickName,
      contents: contents,
      // image: null,
      type: curType
    }
    await axios.put(`http://localhost:3001/post/${editPostId}`, data)
      .then((res) => {
        console.log("게시물 수정 성공");
        return navigate("/");
      })
      .catch(() => alert("게시물 수정 실패"));
  }

  // 해당 게시물 가져오기
  const getPost = async () => {
    await axios.get(`http://localhost:3001/post/${editPostId}`)
      .then((res) => {
        setContents(res.data.contents);
        setPrevType(res.data.type);
        setImage(res.data.image);
      })
      .catch(() => "정보 못 가져왔어~~~");
  }


  return (
    <>
      <CreateListWrapper>
        <CreateWrapper>
          <div className="img_box" style={{height: 200, border: '1px solid #ddd'}}/>
          <form>
            <input type="file" id="image" accept="img/*"/>
            <label htmlFor="image">파일선택</label>
          </form>
          <CreateBody>
            <Textarea
              rows={10}
              placeholder={"내용을 입력하세요"}
              onChange={handleChangeContent}
              defaultValue={contents}
            />
          </CreateBody>
          <SelectTypeWrapper style={contents === "" ? {opacity: 0.5, pointerEvents: 'none'} : undefined}>
            <Text>레이아웃을 선택해주세요</Text>
            <SelectTypeInner>
              <Radio
                id={"full"}
                name={"type"}
                value={"full"}
                label={"이미지 상"}
                onChange={handleChangeType}
                checked={curType ? undefined : prevType === "full"}
              />
              <Radio
                id={"left"}
                name={"type"}
                value={"left"}
                label={"이미지 좌"}
                onChange={handleChangeType}
                checked={curType ? undefined : prevType === "left"}
              />
              <Radio
                id={"right"}
                name={"type"}
                value={"right"}
                label={"이미지 우"}
                onChange={handleChangeType}
                checked={curType ? undefined : prevType === "right"}
              />
            </SelectTypeInner>
          </SelectTypeWrapper>
        </CreateWrapper>
        <div style={{display: 'flex', columnGap: 8}}>
          <Button fluid variant={"outlined"} onClick={() => navigate(-1)}>뒤로가기</Button>
          <Button
            fluid
            onClick={editPost}
            style={(curType === "" && prevType === "") ? {opacity: 0.5, pointerEvents: 'none'} : undefined}
          >게시물 수정</Button>
        </div>
      </CreateListWrapper>
    </>
  )
}

export default EditPostPage;

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