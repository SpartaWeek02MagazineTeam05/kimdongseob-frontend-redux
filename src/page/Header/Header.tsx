import React, {MouseEventHandler} from 'react';
import {Button} from "../../molecule";
import {useNavigate} from "react-router-dom";
import pageList from "../../pageList";
import {BtnGroup, ReactWrapper, Wrapper} from './style';

interface Props {
  changeTheme?: MouseEventHandler;
  isLogin?: boolean;
  onClickLogout?: MouseEventHandler;
}

const Header: React.FC<Props> = (
  {
    changeTheme,
    isLogin,
  }) => {
  const navigate = useNavigate();
  const handleClickLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    navigate(0);
  };

  return (
    <ReactWrapper>
      <Wrapper>
        <div onClick={() => navigate('/')}>GRAM</div>
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

