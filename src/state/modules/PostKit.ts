import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import pageList from "../../pageList";
import {instance} from "../../shared/AxiosInstance";

interface postType {
  postList: any[];
  myLike: any[];
  post: {
    nickName: string | undefined;
    contents: string | undefined;
    likeCount: number | undefined;
    image: string | undefined;
    type: string | undefined;
    createdAt: any | undefined;
    modifiedAt: any | undefined;
    id: any;
  }
}

const initialState: postType = {
  postList: [],
  myLike: [],
  post: {
    id: undefined,
    nickName: undefined,
    contents: undefined,
    likeCount: undefined,
    image: undefined,
    type: undefined,
    createdAt: undefined,
    modifiedAt: undefined,
  }
}

export const getPostList: any = createAsyncThunk<any>('post/getPostList',
  async (data:any) => {
    const storageUserId: any = localStorage.getItem("userId");
    const userId: any = Number(storageUserId);
    return await instance.post(
      "/api/showpost",
      userId
    )
      .then((res) => {
        if (res.data) {
          return ([res.data.total.slice(data.preItem, data.item), res.data.myLike]);
          // return res.data
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
);

export const likePost: any = createAsyncThunk<any>('post/likePost',
  async (data: any) => {
    await instance
      .post('/api/like', {
        postId: data.data.postId,
        userId: parseInt(data.data.userId)
      }, {
        headers: {
          // @ts-ignore
          "X-Auth-Token" : localStorage.getItem("accessToken"),
        }
      })
      .then((res) => {
        if (res.data.result) {
          return;
        }
      })
      .catch((err) => {
        alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
        data.navigate(`${pageList.login}`)
        console.log(err);
      });
  }
);

export const deletePost: any = createAsyncThunk<any>('post/deletePost',
  async (postId: any) => {
    window.confirm("정말로 삭제 하시겠습니까?");
    await instance
      .delete(`/api/post`,
        {
          data: {postId: postId},
          headers: {
            // @ts-ignore
            "X-Auth-Token" : localStorage.getItem("accessToken"),
          }
        }
      )
      .then(() => {
        return postId
      })
      .catch(() => alert("삭제 실패"));
  }
);
export const postSlice = createSlice({
  name: 'post',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getPostList.fulfilled]: (state, action) => {
      state.postList = action.payload[0];
      // state.postList = [...state.postList, ...action.payload[0]];
      state.myLike = action.payload[1];
    },
    [deletePost.fulfilled]: (state, action) => {
      state.postList = state.postList.filter((post)=> post.id !== action.payload);
    },
  },
});

export default postSlice.reducer;