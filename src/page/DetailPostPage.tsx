import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import {Button, Radio, Text, Textarea} from "molecule";
import {useRecoilState, useRecoilValue} from "recoil";
import {detailPostIdAtom, userInfoAtom} from "state";
import axios from "axios";

const DetailPostPage = () => {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userInfoAtom);
  const detailPostId = useRecoilValue(detailPostIdAtom);
  const [contents, setContents] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [curType, setCurType] = useState<string>("");
  const [prevType, setPrevType] = useState<string>();
  const [modifiedData, setModifiedData] = useState({})

  useEffect(() => {
    console.log("detailPostId: ", detailPostId);
    getPost().then(r => r);
  }, []);

  // 해당 게시물 가져오기
  const getPost = async () => {
    await axios.get(`http://localhost:3001/post/${detailPostId}`)
      .then((res) => {
        console.log(res.data);
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
          <Body>
            <Text style={{whiteSpace: 'pre-wrap'}}>{contents}</Text>
          </Body>
        </CreateWrapper>
        <div style={{display: 'flex', columnGap: 8}}>
          <Button fluid variant={"outlined"} onClick={() => navigate(-1)}>뒤로가기</Button>
        </div>
      </CreateListWrapper>
    </>
  )
}

export default DetailPostPage;

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
const Body = styled.div`
   padding: 16px;
`;