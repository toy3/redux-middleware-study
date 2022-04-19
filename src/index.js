import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./modules";
// import myLogger from "./middlewares/myLogger"; // 직접 만든 로거
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk, logger)) // 미들웨어 적용(myLogger, logger). 다른 미들웨어랑 logger를 함께 사용할 경우 logger가 맨 끝에 가도록 해줘야 함.
);

const root = ReactDOM.createRoot(document.getElementById("root"));
// 프로젝트에 리덕스 적용해주기 === Provider, store 적용해주기
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
