import {atom, selector} from "recoil";
import axios from "axios";

const postAtom = atom({
  key: "postAtom",
  default: []
});

const selectorPost = selector({
  key: 'selectorPost',
  get: async ({get}) => {
    get(postAtom);
    const response = await axios.get('http://localhost:3001/post')
      .then((res) => {
        return res.data;
      });
    return response;
  }
});

export {postAtom, selectorPost};