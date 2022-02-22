import {atom, selector} from "recoil";
import axios from "axios";


const postListAtom = atom({
  key: "postListAtom",
  default: []
});


interface PostAtom {
  nickName?: string;
  contents?: string;
  image?: any;
  type?: string;
  id?: number;
}

const postAtom = atom<PostAtom>({
  key: "postAtom",
  default: {
    nickName: "",
    contents: "",
    image: undefined,
    type: "",
    id: 0
  }
})


const selectorPost = selector({
  key: 'selectorPost',
  get: async ({get}) => {
    get(postListAtom);
    return await axios.get(' http://localhost:3001/post')
      .then((res) => {
        return res.data;
      })
      .catch((err) => err);
  },
  // set: async () => {
  //
  // }
});

// 수정할 post id 관리
const editPostIdAtom = atom({
  key: "editPostIdAtom",
  default: 0,
})

// const editPostIdSelector = selector({
//   key: "",
//   get: async ({get}) => {
//     await axios.get('http://localhost:3001/post')
//       .then((res) => {
//         console.log(res);
//         const editPost = res.data.filter((item: any) => item.id === get(editPostIdAtom));
//         console.log("editPost 리코일 : ", editPost);
//         return editPost;
//       })
//       .catch(() => alert("에러다 임마~"));
//   }
// })

// const createPostSelector = selector({
//   key: 'selectorPost',
//   get: async () => {
//     const data = {
//       userId: userInfoAtom,
//       contents: postAtom,
//       like: postAtom
//     };
//     const response = await axios.post('/api/post', data)
//       .then((res) => {
//         return res.data;
//       });
//     return response;
//   }
// });

export {postAtom, postListAtom, selectorPost, editPostIdAtom};