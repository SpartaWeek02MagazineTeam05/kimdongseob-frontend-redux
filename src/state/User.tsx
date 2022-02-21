import {atom, selector} from "recoil";
import axios from "axios";

const userStateAtom = atom({
  key: "userStateAtom",
  default: {
    username: "",
    password: "",
  }
});

const loginAtom = atom({
  key: "loginAtom",
  default: false,
})

interface UserInfoAtom {
  username?: string;
  nickName?: string;
}

const userInfoAtom = atom<UserInfoAtom>({
  key: "userInfo",
  default: {
    username: "",
    nickName: "",
  },
})

// 현재 사용 되지 않음
const selectorUserState = selector({
  key: 'selectorUserState',
  get: async ({get}) => {
    const userInfo = get(userStateAtom)
    const response = await axios.post('/apis/login', {
      username: userInfo.username,
      password: userInfo.password,
    });
    if (response.data.result) {
      localStorage.setItem('token', response.data.token);
      return response.data.result
    } else {
      return false;
    }
  }
});

export {userStateAtom, selectorUserState, loginAtom, userInfoAtom};