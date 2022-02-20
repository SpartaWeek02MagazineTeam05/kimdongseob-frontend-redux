import React, {MouseEventHandler, useEffect} from 'react';
import {Button} from "../molecule";
import {useNavigate} from "react-router-dom";
import pageList from "../pageList";
// import styled from "styled-components";
import {useRecoilState, useRecoilValue} from "recoil";
import {loginAtom, userInfoAtom} from "../state/User";
import {deleteCookie, getCookie} from "../shared/Cookie";
import styled from "styled-components";

interface Props {
  changeTheme?: MouseEventHandler;
}

const Header: React.FC<Props> = (
  {
    changeTheme
  }) => {
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
    <Wrapper>
      <div>GRAM</div>
      <BtnGroup>
        <Button onClick={changeTheme}>테마변경</Button>
        {!isLogin ?
          <>
            <Button variant="outlined" onClick={() => navigate(`/${pageList.login}`)}>로그인</Button>
          </> :
          <Button onClick={handleClickLogout}>logOut</Button>
        }
      </BtnGroup>
    </Wrapper>
  )
}

export default Header;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BtnGroup = styled.div`
  display: flex;
  align-items: center;
  column-gap: 4px;
`;