import React, {useState} from 'react';
import {Input, Button, Text} from "molecule";
import {Link, useNavigate} from "react-router-dom";
import pageList from "../../pageList";
import {useDispatch} from "react-redux";
import {login} from "../../state/modules/UserKit";


const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handleChangePwd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleClickLogin = async () => {
    if (username === "" || password === "") {
      alert("빈칸이다 임마");
      return;
    } else {
      const data = {
        username: username,
        password: password,
      }
      dispatch(login({data, navigate}))
    }
  }
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      handleClickLogin().then(r => r);
    }
  }

  return (
    <>
      <div>LoginPage</div>
      {/*{userIdState && <div>{userIdState.userId}</div>}*/}

      <Input label={"아이디"} onChange={handleChangeId} autoFocus/>
      <Input label={"비밀번호"} type={"password"} onChange={handleChangePwd} disabled={username === "" && true}
             onKeyUp={handleKeyUp}/>
      <div style={{display: 'flex', columnGap: 8}}>
        <Button fluid variant={"outlined"} onClick={() => navigate(-1)}>뒤로가기</Button>
        <Button fluid onClick={handleClickLogin} disabled={password === "" && true}>로그인하기</Button>
      </div>
      <div style={{display: 'flex', marginTop: 8}}>
        <Text color={"#ddd"}>아직 회원이 아니신가요?</Text>
        <Link to={`/${pageList.signUp}`} style={{marginLeft: 8}}>회원가입</Link>
      </div>
    </>
  )
}

export default LoginPage;
