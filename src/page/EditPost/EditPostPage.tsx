import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Button, Radio, Text, Textarea} from "molecule";
import {RootState} from "state";
import {useSelector} from "react-redux";
import {instance} from "../../shared/AxiosInstance";
import {CreateBody, CreateListWrapper, CreateWrapper, SelectTypeInner, SelectTypeWrapper} from './style';

const EditPostPage = () => {
  const navigate = useNavigate();
  const param = useParams();
  const [contents, setContents] = useState<string>("");
  const [curType, setCurType] = useState<string>("");
  const [prevType, setPrevType] = useState<string>();
  const postList = useSelector((state: RootState) => state.post.postList);
  const userInfo = useSelector((state: RootState) => state.user.userInfo);

  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContents(e.target.value);
  };

  const handleChangeType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurType(e.target.value);
  }


  const post = postList.filter((post: any) => post.id === Number(param.postId))[0];
  const editPost = async () => {
    if (post.contents === "" && contents === "") {
      alert("내용을 입력해 임마");
      return;
    }
    console.log(typeof param.postId);
    const data = {
      postId: parseInt(param.postId as string),
      // postId: param.postId,
      nickName: userInfo.nickName,
      contents: contents,
      likeCount: post.likeCount,

      //!Todo: 이미지 받아오는 로직 추가해야함!!
      image: post.image,
      type: curType
    }
    const config = {
      headers: {
        "X-Auth-Token": localStorage.getItem("accessToken"),
      },
    }
    // @ts-ignore
    await instance.put(`/api/post`, data, config)
      .then(() => {
        console.log("게시물 수정 성공");
        return navigate("/", {replace: true});
      })
      .catch(() => alert("게시물 수정 실패"));
  }

  // // 해당 게시물 가져오기
  // const getPost = async () => {
  //   await axios.get(`http://localhost:3001/post/${editPostId}`)
  //     .then((res) => {
  //       setContents(res.data.contents);
  //       setPrevType(res.data.type);
  //       setImage(res.data.image);
  //     })
  //     .catch(() => "정보 못 가져왔어~~~");
  // }


  return (
    <>
      <CreateListWrapper>
        <CreateWrapper>
          <img className="img_box" style={{height: 200, border: '1px solid #ddd'}} src={post.image}/>
          <form>
            <input type="file" id="image" accept="img/*"/>
            <label htmlFor="image">파일선택</label>
          </form>
          <CreateBody>
            <Textarea
              rows={10}
              placeholder={"내용을 입력하세요"}
              onChange={handleChangeContent}
              defaultValue={post.contents}
            />
          </CreateBody>
          <SelectTypeWrapper style={post.contents === "" ? {opacity: 0.5, pointerEvents: 'none'} : undefined}>
            <Text>레이아웃을 선택해주세요</Text>
            <SelectTypeInner>
              <Radio
                id={"full"}
                name={"type"}
                value={"full"}
                label={"이미지 상"}
                onChange={handleChangeType}
                checked={curType ? undefined : post.type === "full"}
              />
              <Radio
                id={"left"}
                name={"type"}
                value={"left"}
                label={"이미지 좌"}
                onChange={handleChangeType}
                checked={curType ? undefined : post.type === "left"}
              />
              <Radio
                id={"right"}
                name={"type"}
                value={"right"}
                label={"이미지 우"}
                onChange={handleChangeType}
                checked={curType ? undefined : post.type === "right"}
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
