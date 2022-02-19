import React, {useEffect} from 'react';
import {Button} from "../molecule";
import {useNavigate} from "react-router-dom";
import pageList from "../pageList";
// import styled from "styled-components";
import {useRecoilState, useRecoilValue} from "recoil";
import {loginAtom, userInfoAtom} from "../state/User";
import {deleteCookie, getCookie} from "../shared/Cookie";

interface Props {

}

const Header: React.FC<Props> = (
  {}) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useRecoilState(loginAtom);
  const userInfo = useRecoilValue(userInfoAtom);

  useEffect(() => {
    const cookie = getCookie(document.cookie);
  }, [])

  const handleClickLogout = () => {
    deleteCookie(userInfo.userId);
    setIsLogin(false);
  };
  return (
    <>
      <div>GRAM</div>
      {!isLogin ?
        <>
          <Button onClick={() => navigate(`/${pageList.login}`)}>login</Button>
          <Button onClick={() => navigate(`/${pageList.signUp}`)}>Sign Up</Button>
        </> :
        <Button onClick={handleClickLogout}>logOut</Button>
      }
    </>
  )
}

export default Header;