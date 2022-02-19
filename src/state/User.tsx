import {atom, selector} from "recoil";
import axios from "axios";

const userIdAtom = atom({
  key: "userIdAtom",
  default: {userId: ""}
});

const userStateAtom = atom({
  key: "userStateAtom",
  default: {
    userId: "",
    password: "",
  }
});

const loginAtom = atom({
  key: "loginAtom",
  default: false,
})

const userInfoAtom = atom({
  key: "userInfo",
  default: {userId: ""},
})

const selectorUserState = selector({
  key: 'selectorUserState',
  get: async ({get}) => {
    const userInfo = get(userStateAtom)
    const response = await axios.post('http://localhost:3001/login', {
      userId: userInfo.userId,
      password: userInfo.password,
    });
    if(response.data.result) {
      localStorage.setItem('token', response.data.token);
      return response.data.result
    } else {
      return false;
    }
  }
});

export {userIdAtom, userStateAtom, selectorUserState, loginAtom, userInfoAtom};