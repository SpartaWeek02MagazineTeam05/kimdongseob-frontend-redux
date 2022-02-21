import React, {useState, useEffect} from 'react';
import {Input, Button, Text} from "molecule";
import {loginAtom, userInfoAtom} from 'state/User';
import {useRecoilState} from 'recoil';
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import {setCookie} from "shared/Cookie";
import pageList from "../pageList";


const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useRecoilState(loginAtom);
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);

  useEffect(() => {
    // getUserProps();
    // console.log('userStateCoil : ', userStateCoil);
  });

  const handleChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handleChangePwd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwd(e.target.value);
  };
  const handleClickLogin = async () => {
    if (username === "" || pwd === "") {
      alert("빈칸이다 임마");
      return;
    } else {
      //!TODO : mock 때문에 주석
      // const frm = new FormData();
      // frm.append('username', userId);
      // frm.append('password', pwd);
      //
      // const auth = new URLSearchParams();
      // auth.append('username', userId);
      // auth.append('password', pwd);

      const data = {
        username: username,
        password: pwd
      }
      return await axios.post("/api/login", data)
        .then((res: any) => {
          console.log(res);
          if (res.data.result) {
            setUserInfo({username: res.data.username, nickName: res.data.nickName});
            setIsLogin(true);
            console.log(userInfo);
            console.log(isLogin);
            setCookie("username", username);
            setCookie("nickName", res.data.nickName);
            navigate("/")
          }
        }).catch(() => alert("실패"));
    }
  }
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.code === "Enter") {
      handleClickLogin();
    }
  }


  return (
    <>
      <div>LoginPage</div>
      {/*{userIdState && <div>{userIdState.userId}</div>}*/}

      <Input label={"아이디"} onChange={handleChangeId} autoFocus/>
      <Input label={"비밀번호"} onChange={handleChangePwd} disabled={username === "" && true} onKeyUp={handleKeyUp}/>
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
