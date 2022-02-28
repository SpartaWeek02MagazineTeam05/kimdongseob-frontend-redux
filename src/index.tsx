import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyle from "./assets/style/global-styles";
import {store} from "./state/configStore";
import {Provider} from "react-redux";


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyle/>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
;
