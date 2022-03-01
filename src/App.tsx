import React, {useEffect, useState} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {EditPostPage, Header, LoginPage, PostListPage, SignUpPage, DetailPostPage} from './page'
import pageList from "./pageList";
import CreatePostPage from "./page/CreatePost/CreatePostPage";
import styled, {ThemeProvider} from "styled-components";
import {lightTheme, darkTheme} from "./assets/style/theme";
import {Provider, useDispatch, useSelector} from "react-redux";
import {RootState} from "./state";
import {loginCheck, renewalUserInfo} from "state/modules/UserKit";
import jwt_decode from "jwt-decode";


function App() {
  const dispatch = useDispatch();
  const [theme, setTheme] = useState<any>(lightTheme)
  const isLogin = useSelector((state:RootState) => state.user.isLogin)
  const userInfo = useSelector((state:RootState) => state.user.userInfo)
  const changeTheme = () => {
    if (theme === lightTheme)
      setTheme(darkTheme);
    else {
      setTheme(lightTheme);
    }
  }

  const myToken = localStorage.getItem("accessToken")

  useEffect(() => {
    if(myToken){
      const decodedToken: any= jwt_decode(myToken);
      console.log("decodedToken.userId::::",decodedToken.userId)
      const userData = {
        nickName: decodedToken.nickName,
        userId: decodedToken.userId
      }
      dispatch(loginCheck(true));
      dispatch(renewalUserInfo(userData));
    }
  },[isLogin, dispatch])

  console.log("isLogin", isLogin)
  console.log("userInfo", userInfo)

  return (
    <ThemeProvider theme={theme}>
      {/*<RecoilRoot>*/}
        <BrowserRouter>
          <BodyWrapper id={"scroll-body-wrapper"}>
            <div>
              {/*<Suspense fallback={() => <p>loading...</p>}>*/}
              <Header changeTheme={changeTheme} isLogin={isLogin}/>
              <BodyInner>
                <Routes>
                  <Route path="/" element={<PostListPage/>}/>
                  {/*<Route path={"/"} element={<SignUpPage/>}/>*/}
                  <Route path={`/${pageList.signUp}`} element={<SignUpPage/>}/>
                  <Route path={`/${pageList.login}`} element={<LoginPage/>}/>
                  <Route path={`/${pageList.createPost}`} element={<CreatePostPage/>}/>
                  <Route path={`/${pageList.editPost}/:postId`} element={<EditPostPage/>}/>
                  <Route path={`/${pageList.detailPost}/:postId`} element={<DetailPostPage/>}/>
                </Routes>
              </BodyInner>
              {/*</Suspense>*/}
            </div>
          </BodyWrapper>
        </BrowserRouter>
      {/*</RecoilRoot>*/
      }
    </ThemeProvider>
  );
}

export default App;

const BodyWrapper = styled.div`
height: 100vh;
overflow: auto;
background-color:${({theme}) => theme.colors.white};

> div {
margin: 0 auto;
}
`;

const BodyInner = styled.div`
max-width: 400px;
margin: 0 auto;
padding-top: 80px;
`;
