import React, {Suspense, useState} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {EditPostPage, Header, LoginPage, PostListPage, SignUpPage} from './page'
import pageList from "./pageList";
import {RecoilRoot} from "recoil";
import CreatePostPage from "./page/CreatePostPage";
import styled, {ThemeProvider} from "styled-components";
import {lightTheme, darkTheme} from "./assets/style/theme";


function App() {
  const [theme, setTheme] = useState<any>(lightTheme)
  const changeTheme = () => {
    if (theme === lightTheme)
      setTheme(darkTheme);
    else {
      setTheme(lightTheme);
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <RecoilRoot>
          <BodyWrapper>
            <div>
              <Suspense fallback={() => <p>loading...</p>}>
                <Header changeTheme={changeTheme}/>
                <Routes>
                  <Route path="/" element={<PostListPage/>}/>
                  <Route path={`/${pageList.signUp}`} element={<SignUpPage/>}/>
                  <Route path={`/${pageList.login}`} element={<LoginPage/>}/>
                  <Route path={`/${pageList.createPost}`} element={<CreatePostPage/>}/>
                  <Route path={`/${pageList.editPost}/:postId`} element={<EditPostPage/>}/>
                </Routes>
              </Suspense>
            </div>
          </BodyWrapper>
        </RecoilRoot>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

const BodyWrapper = styled.div`
  //height: 100%;
  padding: 16px 30px;
  background-color:${({theme}) => theme.colors.white};
  
  > div {
    max-width: 400px;
    margin: 0 auto;    
  }
`;
