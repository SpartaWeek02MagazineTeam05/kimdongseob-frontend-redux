// src/assets/styles/global-styles.ts
import {createGlobalStyle} from "styled-components";
import normalize from "styled-normalize";

// 위에서 받은 `normalize`로 기본 css가 초기화 합니다.
const GlobalStyle = createGlobalStyle`
  ${normalize}

  html {
    height: 100%;
    font-size: 14px;
  }
  body {
    height: inherit;
    overflow: hidden;
    //background-color: #ddd;
  }
  #root {
    height: inherit;
  }

  * {
    font-family: 'Noto Sans', sans-serif;
    box-sizing: border-box;
    line-height: 1;
  }
  @font-face {
    font-family: 'Noto Sans';
    font-weight: 400;
    src: url(/static/fonts/NotoSansKR-Regular.otf);
  }
  
  @font-face {
      font-family: 'Noto Sans';
      font-weight: 500;
      src: url(/static/fonts/NotoSansKR-Medium.otf);
  }
  
  
  @font-face {
      font-family: 'Noto Sans';
      font-weight: 300;
      src: url(/static/fonts/NotoSansKR-Light.otf);
  }
  
  
  @font-face {
      font-family: 'Noto Sans';
      font-weight: 700;
      src: url(/static/fonts/NotoSansKR-Bold.otf);
  }
`;

export default GlobalStyle;