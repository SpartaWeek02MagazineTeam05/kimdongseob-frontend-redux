import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import pageList from "../../pageList";
import jwt_decode from "jwt-decode";
import {instance} from "../../shared/AxiosInstance";

// createAction 은 타입등을 지정할 수 있음
// const addToDo = createAction("ADD");
// const deleteToDo = createAction("DELETE");

//createReducer
//첫번째 인자는 initial state 이다
//더이상 switch 문이 필요하지 않다
//state를 mutate하기 쉬워진다!
//mutate란 흠.. 새롭게 파생한다? 라고 생각하면 될 듯!
//그냥 react-redux는 state를 mutate를 하지 못했음, 새로운 state를 만들었어야했지
/*const reducer = createReducer([], {
  [addToDo]: (state: any, action: any) => {
    // return [{text: action.payload, id: Date.now()}, ...state]
    // redux를 사용하면 바로 위와 같은 문장으로 작성해야한다. 즉 새로운 state를 만들어 리턴해야한다
    state.push({text: action.payload, id: Date.now()});
  },
  [deleteToDo]: (state: any, action: any) => {
    return state.filter(toDo => toDo.id !== action.payload);
  },
})*/

interface userType {
  userInfo: {
    username: string | null;
    nickName: string | null
  }
  isLogin: boolean;
  register: boolean;
}

const initialState: userType = {
  userInfo: {
    username: null,
    nickName: null,
  },
  isLogin: false,
  register: false,
}


// 미들웨어
export const signUp: any = createAsyncThunk<any>('user/signUp',
  async (registerData: any) => {
    console.log("registerData", registerData)
    return await axios.post("api/register", registerData.data)
      .then((res) => {
        if (res.data.result) {
          console.log(res.data.msg);
          return registerData.navigate(`${pageList.login}`);
        } else {
          console.log(res.data.msg);
          return res.data.result;
        }
      })
      .catch((err) => {
        console.log("에러났어요 : ", err)
      });
  })

export const login: any = createAsyncThunk<any>('user/login',
  async (loginData: any) => {
    return await instance
      .post(
        "/api/login",
        loginData.data,
        )
      .then((res) => {
        console.log(res)
        if (res.data.result) {
          const decodedToken: any= jwt_decode(res.data.tokenname);
          localStorage.setItem("accessToken", res.data.tokenname);
          localStorage.setItem("userId", decodedToken.userId);
          loginData.navigate('/');
          // axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data
          return {
            userInfo: {
              username: loginData.data.username,
              nickName: loginData.data.nickName,
            },
            isLogin: true
          };
        }
      })
      .catch(() => alert("ERROR!!!!"));
  }
)

export const loginCheck: any = createAsyncThunk<any>('userCheck',
  ()=>{}
  )
export const renewalUserInfo: any = createAsyncThunk<any>('renewalUserInfo',
  (userData) => userData
);

// createSlice
// reducer 뿐 만 아니라 actions 도 생성해줌
// @ts-ignore
export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [renewalUserInfo.fulfilled] : (state, action) => {
      state.userInfo.nickName = action.payload.nickName;
    },
    [loginCheck.fulfilled] : (state) => {
      state.isLogin = true;
    },
    [signUp.fulfilled]: (state, action) => {
      console.log("state ", state);
      console.log("action.payload ", action.payload);
      state.register = action.payload
    },
    [login.fulfilled]: (state, action) => {
      state.userInfo = action.payload.userInfo;
      state.isLogin = action.payload.isLogin;
    }
  },
})

export default userSlice.reducer;