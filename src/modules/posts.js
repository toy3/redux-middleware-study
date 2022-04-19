import * as postsAPI from "../api/posts"; // api/posts 안의 함수 모두 불러오기
import {
  createPromiseThunk,
  createPromiseThunkById,
  handleAsyncActions,
  handleAsyncActionsById,
  reducerUtils,
} from "../lib/asyncUtils";
import { call, put, takeEvery } from "redux-saga/effects";

//getPosts 에 대한 ACTION
const GET_POSTS = "GET_POSTS"; // 특정 요청이 시작됐다를 알리는 ACTION
const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
const GET_POSTS_ERROR = "GET_POSTS_ERROR";

// getPostsById 에 대한 ACTION (한개의 POST 처리)
const GET_POST = "GET_POST";
const GET_POST_SUCCESS = "GET_POST_SUCCESS";
const GET_POST_ERROR = "GET_POST_ERROR";

// 초기화 ACTION
const CLEAR_POST = "CLEAR_POST";

////// [ thunk 생성함수 ]
// saga 액션 객체
export const getPosts = () => ({ type: GET_POSTS });
export const getPost = (id) => ({
  type: GET_POST,
  payload: id,
  meta: id,
});

// saga 함수들
function* getPostsSaga() {
  try {
    const posts = yield call(postsAPI.getPosts); // yield call은 프로미스가 끝날때까지 기다렸다가 그 결과물을 posts 안에 담아준다.
    yield put({
      type: GET_POSTS_SUCCESS,
      payload: posts,
    });
  } catch (e) {
    yield put({
      type: GET_POSTS_ERROR,
      payload: e,
      error: true,
    });
  }
}

function* getPostSaga(action) {
  const id = action.payload;
  try {
    const post = yield call(postsAPI.getPostsById, id);
    yield put({
      type: GET_POST_SUCCESS,
      payload: post,
      meta: id,
    });
  } catch (e) {
    yield put({
      type: GET_POST_ERROR,
      payload: e,
      error: true,
      meta: id,
    });
  }
}

// 위 리덕스 모듈을 위한 saga를 모니터링 해주는 함수. rootSaga에 등록해준다.
export function* postsSaga() {
  yield takeEvery(GET_POSTS, getPostsSaga);
  yield takeEvery(GET_POST, getPostSaga);
}

export const goToHome = () => (dispatch, getState, extra) => {
  const { history } = extra;
  history.push("/");
};

// 초기화
export const clearPost = () => ({ type: CLEAR_POST });

// 기본 상태
const initialState = {
  posts: reducerUtils.initial(),
  // post: reducerUtils.initial(),
  // 이전에 봤던 post 캐싱기능 구현 위해 새로 작성
  post: {},
};

////// [ 리듀서 ]
const getPostsReducer = handleAsyncActions(GET_POSTS, "posts", true);
// 이전에 봤던 post 캐싱기능 구현 위해 새로 작성
// const getPostReducer = handleAsyncActions(GET_POST, "post");
const getPostReducer = handleAsyncActionsById(GET_POST, "post", true);

export default function posts(state = initialState, action) {
  switch (action.type) {
    // posts
    case GET_POSTS:
    case GET_POSTS_SUCCESS:
    case GET_POSTS_ERROR:
      return getPostsReducer(state, action); // 위 3개의 action 중 하나일경우 실행됨.
    // post
    case GET_POST:
    case GET_POST_SUCCESS:
    case GET_POST_ERROR:
      return getPostReducer(state, action); // 위 3개의 action 중 하나일경우 실행됨.
    case CLEAR_POST:
      return {
        ...state,
        post: reducerUtils.initial(),
      };
    default:
      return state;
  }
}
