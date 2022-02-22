import React, {MouseEventHandler, useEffect} from 'react';
import {Button} from "../molecule";
import {useNavigate} from "react-router-dom";
import pageList from "../pageList";
// import styled from "styled-components";
import {useRecoilState, useRecoilValue} from "recoil";
import {loginAtom, userInfoAtom} from "state";
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
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);

  useEffect(() => {
    const cookie = document.cookie;
    const splitCookie = cookie.split("; ");
    let resCookie: (string | undefined)[] = []
    splitCookie.forEach((item) => {
      resCookie.push(item.split("=").pop());
    });
    if (cookie) {
      setUserInfo({username: resCookie[0], nickName: resCookie[1]});
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  const handleClickLogout = () => {
    deleteCookie("username");
    deleteCookie("nickName");
    setIsLogin(false);
    navigate("/");
  };
  return (
    <ReactWrapper>
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
    </ReactWrapper>
  )
}

export default Header;

const ReactWrapper = styled.div`
  position: fixed;
  width: 100%;
  background-color: ${({theme}) => theme.colors.grayBg};
  height: 60px;
  padding: 2rem;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
`;

const BtnGroup = styled.div`
  display: flex;
  align-items: center;
  column-gap: 4px;
`;