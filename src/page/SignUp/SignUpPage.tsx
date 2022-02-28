import React, {useState} from 'react';
import {Button, Input} from "molecule";
import {validateEmail, validatePwd} from "shared/validationCheck";
import {useNavigate} from "react-router-dom";
import {signUp} from "../../state/modules/UserKit";
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from "../../state";

const SignUpPage = () => {
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [nickName, setNickName] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  }
  const changePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }
  const changePwCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(e.target.value);
  }
  const changeNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  }

  const handleClickRegister = async () => {
    if (userId === "" || password === "" || nickName === "" || passwordCheck === "") {
      return alert("빈칸있다 임마!");
    } else if (passwordCheck !== password) {
      return;
    } else {
      const data = {
        username: userId,
        nickName: nickName,
        password: password,
        passwordCheck: passwordCheck,
      }
      dispatch(signUp({data, navigate}))
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
      {(password !== "" && !validatePwd(password)) && <div>형식 틀렸어 임마</div>}
      {(password !== "" && validatePwd(password)) && <div>형식 맞았어 임마</div>}

      <Input
        label={"비밀번호 확인"}
        placeholder={"비밀번호를 다시 한번 입력하세요"}
        type="password"
        onChange={changePwCheck}
        disabled={!validatePwd(password) && true}
      />

      {password !== "" && password === passwordCheck ? <div>일치해</div>
        : passwordCheck !== "" && password !== passwordCheck ? <div>일치하지 않아</div> : null
      }
      <div style={{display: 'flex', columnGap: 8}}>
        <Button fluid variant={"outlined"} onClick={() => navigate(-1)}>뒤로가기</Button>
        <Button fluid onClick={handleClickRegister} disabled={passwordCheck === "" && true}>가입하기</Button>
      </div>
    </>
  )
}

export default SignUpPage;