import React, { useState } from 'react';
import { Button, Input } from "molecule";
import { validateEmail, validatePwd } from "shared/validationCheck";
import axios from "axios";

const SignUpPage = () => {
  const [ userId, setUserId ] = useState<string>("");
  const [ pwd, setPwd ] = useState<string>("");
  const [ pwdCheck, setPwdCheck ] = useState<string>("");
  const [ nickName, setNickName ] = useState<string>("");

  const changeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  }
  const changePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwd(e.target.value);
  }
  const changePwCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwdCheck(e.target.value);
  }
  const changeNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  }

  const signUp = async () => {
    if ( userId === "" || pwd === "" || nickName === "" || pwdCheck === "" ) {
      return alert("빈칸있다 임마!");
    } else if ( pwdCheck !== pwd ) {
      return;
    } else {
      const data = {
        userId: userId,
        password: pwd,
        userPwdCheck: pwdCheck,
        nickName: nickName
      }
      await axios.post("http://localhost:3001/register", data)
        .then((response) => {
          console.log(response.data)
        })
        .catch((err) => {
          console.log("error : ", err)
        })
    }
  }

  return (
    <>
      <div>회원가입</div>
      <Input
        label={ "이메일" }
        onChange={ changeId }
        rightBtn={
          <Button>중복확인</Button>
        }
      />
      { (userId !== "" && !validateEmail(userId)) && <div>형식 틀렸어 임마</div> }
      { (userId !== "" && validateEmail(userId)) && <div>형식 맞았어 임마</div> }

      <Input
        label={ "닉네임" }
        onChange={ changeNickName }
        disabled={ !validateEmail(userId) && true }
      />

      <Input
        label={ "비밀번호" }
        type="password"
        onChange={ changePw }
        disabled={ nickName === "" && true }
      />
      { (pwd !== "" && !validatePwd(pwd)) && <div>형식 틀렸어 임마</div> }
      { (pwd !== "" && validatePwd(pwd)) && <div>형식 맞았어 임마</div> }

      <Input
        label={ "비밀번호 확인" }
        type="password"
        onChange={ changePwCheck }
        disabled={ !validatePwd(pwd) && true }
      />

      { pwd !== "" && pwd === pwdCheck ? <div>일치해</div>
        : pwdCheck !== "" && pwd !== pwdCheck ? <div>일치하지 않아</div> : null
      }
      <Button onClick={ signUp } disabled={pwdCheck === "" && true}>회원 가입하기</Button>
    </>
  )
}

export default SignUpPage;