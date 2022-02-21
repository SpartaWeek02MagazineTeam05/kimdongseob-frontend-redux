import React, {useState} from 'react';
import {Button, Input} from "molecule";
import {validateEmail, validatePwd} from "shared/validationCheck";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const SignUpPage = () => {
  const [userId, setUserId] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");
  const [pwdCheck, setPwdCheck] = useState<string>("");
  const [nickName, setNickName] = useState<string>("");
  const navigate = useNavigate();

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
    if (userId === "" || pwd === "" || nickName === "" || pwdCheck === "") {
      return alert("빈칸있다 임마!");
    } else if (pwdCheck !== pwd) {
      return;
    } else {
      const data = {
        userId: userId,
        password: pwd,
        userPwdCheck: pwdCheck,
        nickName: nickName
      }
      await axios.post("/api/register", data)
        .then((response) => {
          console.log(response.data);
          navigate("/login");
        })
        .catch((err) => {
          console.log("error : ", err)
        });
    }
  };

  return (
    <>
      <div>회원가입</div>
      <Input
        label={"이메일"}
        placeholder={"이메일 주소를 입력하세요"}
        onChange={changeId}
        rightBtn={
          <Button>중복확인</Button>
        }
      />
      {(userId !== "" && !validateEmail(userId)) && <div>형식 틀렸어 임마</div>}
      {(userId !== "" && validateEmail(userId)) && <div>형식 맞았어 임마</div>}

      <Input
        label={"닉네임"}
        placeholder={"닉네임을 입력하세요"}
        onChange={changeNickName}
        disabled={!validateEmail(userId) && true}
      />

      <Input
        label={"비밀번호"}
        placeholder={"비밀번호를 입력하세요"}
        type="password"
        onChange={changePw}
        disabled={nickName === "" && true}
      />
      {(pwd !== "" && !validatePwd(pwd)) && <div>형식 틀렸어 임마</div>}
      {(pwd !== "" && validatePwd(pwd)) && <div>형식 맞았어 임마</div>}

      <Input
        label={"비밀번호 확인"}
        placeholder={"비밀번호를 다시 한번 입력하세요"}
        type="password"
        onChange={changePwCheck}
        disabled={!validatePwd(pwd) && true}
      />

      {pwd !== "" && pwd === pwdCheck ? <div>일치해</div>
        : pwdCheck !== "" && pwd !== pwdCheck ? <div>일치하지 않아</div> : null
      }
      <div style={{display: 'flex', columnGap: 8}}>
        <Button fluid variant={"outlined"} onClick={() => navigate(-1)}>뒤로가기</Button>
        <Button fluid onClick={signUp} disabled={pwdCheck === "" && true}>가입하기</Button>
      </div>
    </>
  )
}

export default SignUpPage;