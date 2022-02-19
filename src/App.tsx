import React, {Suspense} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Header, LoginPage, PostListPage, SignUpPage} from './page'
import pageList from "./pageList";
import {RecoilRoot} from "recoil";
import CreatePostPage from "./page/CreatePostPage";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <RecoilRoot>
          <Suspense fallback={() => <p>loading...</p>}>
            <Header/>
            <Routes>
              <Route path="/" element={<PostListPage/>}/>
              <Route path={`/${pageList.signUp}`} element={<SignUpPage/>}/>
              <Route path={`/${pageList.login}`} element={<LoginPage/>}/>
              <Route path={`/${pageList.createPost}`} element={<CreatePostPage/>}/>
            </Routes>
          </Suspense>
        </RecoilRoot>
      </BrowserRouter>
    </div>
  )
    ;
}

export default App;
