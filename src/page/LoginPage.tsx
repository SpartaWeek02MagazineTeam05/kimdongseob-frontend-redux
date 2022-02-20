import React, {useState, useEffect} from 'react';
import {Input, Button, Text} from "molecule";
import {loginAtom, userInfoAtom} from 'state/User';
import {useSetRecoilState, useRecoilState} from 'recoil';
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import {setCookie} from "shared/Cookie";
import pageList from "../pageList";


const LoginPage = () => {
  // const loginState = useRecoilValue(selectorUserState);
  // const [userIdState, setUserIdState] = useRecoilState(userIdAtom);
  const [userId, setUserId] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useRecoilState(loginAtom);
  const setUserInfo = useSetRecoilState(userInfoAtom);

  useEffect(() => {
    // getUserProps();
    // console.log('userStateCoil : ', userStateCoil);
  });

  const handleChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };
  const handleChangePwd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwd(e.target.value);
  };
  // setCookie("userId", "www@naver.com")
  // setCookie("password", "Gkdgo12!")
  const handleClickLogin = async () => {
    if (userId === "" || pwd === "") {
      alert("빈칸이다 임마");
      return;
    } else {
      // 로그인 정보가 true 면
      // if (loginState) {
      //   setUserIdState({userId: userId})
      //   navigate('/');
      // } else {
      //   alert("로그인 실패!");
      // }
      // console.log("loginState: ", loginState)
      // console.log("userIdState: ", userIdState)
      const frm = new FormData();
      frm.append('username', userId);
      frm.append('password', pwd);
      await axios.post("http://localhost:3001/login", frm).then((res: any) => {
        if (res.data.result) {
          setUserInfo({userId: res.data.userId})
          setIsLogin(true);
          console.log(isLogin);
          setCookie("userId", res.data.userId)
          setCookie("password", res.data.userId)
          navigate("/")
        }
      }).catch(() => alert("실패"));
    }
    // if(login.data.result === true) {
    //   setUserIdState(userId);
    //   console.log(userIdState)
    //   localStorage.setItem('token', login.data.token)
    // }

    // const login = await axios.get("http://localhost:3001/login")
    // console.log(login.data)
    // console.log(login.data.userId)
    // const result =  login.data.filter((user: any) => {
    //   if (user.userId === userId && user.password === pwd) {
    //     return true
    //   }
    // })
    // if(result) {
    //   setUserIdState(userId)
    //   console.log('성공');
    //   console.log("userIdState:", userIdState);
    // }
  }


  return (
    <>
      <div>LoginPage</div>
      {/*{userIdState && <div>{userIdState.userId}</div>}*/}

      <Input label={"아이디"} onChange={handleChangeId} autoFocus/>
      <Input label={"비밀번호"} onChange={handleChangePwd} disabled={userId === "" && true}/>
      <div style={{display: 'flex', columnGap: 8}}>
        <Button fluid variant={"outlined"} onClick={() => navigate(-1)}>뒤로가기</Button>
        <Button fluid onClick={handleClickLogin} disabled={pwd === "" && true}>로그인하기</Button>
      </div>
      <div style={{display: 'flex', marginTop: 8}}>
        <Text color={"#ddd"}>아직 회원이 아니신가요?</Text>
        <Link to={`/${pageList.signUp}`} style={{marginLeft: 8}}>회원가입</Link>
      </div>
    </>
  )
}

export default LoginPage;
