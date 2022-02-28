import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Button, Radio, Text, Textarea} from "molecule";
import {RootState} from "state";
import {useDispatch, useSelector} from "react-redux";
import {instance} from "../../shared/AxiosInstance";
import {CreateBody, CreateListWrapper, CreateWrapper, SelectTypeInner, SelectTypeWrapper} from './style'

const CreatePostPage = () => {
  const navigate = useNavigate();
  const [contents, setContents] = useState<string>("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [curType, setCurType] = useState<string>("");
  const nickName = useSelector((state: RootState) => state.user.userInfo.nickName);

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
  const handleClickCreate = async () => {
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
      headers: {
        "X-Auth-Token": localStorage.getItem("accessToken"),
      },
    }
    const data = {
      nickName: nickName,
      contents: contents,
      image: files && files[0].name,
      type: curType
    }
    // @ts-ignore
    await instance.post('/api/post', data, config)
      .then((res) => {
        if (res.data.result) {
          navigate("/", {replace: true});
        }
      })
      .catch((err) => alert(err));
  }

  const onLoadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files;
    setFiles(file);
  }

  const goToBack = () => {
    if (contents !== "" && window.confirm("작성 중인 내용이 모두 사라집니다. 그래도 뒤로 가시겠습니까?")) {
      navigate(-1);
    }
    navigate(-1);
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
          <Button fluid variant={"outlined"} onClick={goToBack}>뒤로가기</Button>
          <Button
            fluid
            onClick={handleClickCreate}
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
