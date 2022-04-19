import * as postsAPI from "../api/posts";
import { createPromiseThunk, reducerUtils } from "../lib/asyncUtils";

//getPosts 에 대한 ACTION
const GET_POSTS = "GET_POSTS"; // 특정 요청이 시작됐다를 알리는 ACTION
const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
const GET_POSTS_ERROR = "GET_POSTS_ERROR";

// getPostsById 에 대한 ACTION (한개의 POST 처리)
const GET_POST = "GET_POST";
const GET_POST_SUCCESS = "GET_POST_SUCCESS";
const GET_POST_ERROR = "GET_POST_ERROR";

// thunk 생성함수
// posts
export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);

// post
export const getPost = createPromiseThunk(GET_POST, postsAPI.getPostsById);

// 기본 상태
const initialState = {
  posts: reducerUtils.initial(),
  post: reducerUtils.initial(),
};

// 리듀서
export default function posts(state = initialState, action) {
  switch (action.type) {
    // posts
    case GET_POSTS:
      return {
        ...state,
        posts: reducerUtils.loading(),
      };
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: reducerUtils.success(action.payload),
      };
    case GET_POSTS_ERROR:
      return {
        ...state,
        posts: reducerUtils.error(action.payload),
      };
    // post
    case GET_POST:
      return {
        ...state,
        posts: reducerUtils.loading(),
      };
    case GET_POST_SUCCESS:
      return {
        ...state,
        posts: reducerUtils.success(action.payload),
      };
    case GET_POST_ERROR:
      return {
        ...state,
        posts: reducerUtils.error(action.payload),
      };
    default:
      return state;
  }
}
