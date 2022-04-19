export const reducerUtils = {
  initial: (data = null) => ({
    data,
    loading: false,
    error: null,
  }),
  loading: (prevState = null) => ({
    data: prevState,
    loading: true,
    error: null,
  }),
  success: (data) => ({
    data,
    loading: false,
    error: null,
  }),
  error: (error) => ({
    data: null,
    loading: false,
    error,
  }),
};

// type 은 GET_POSTS 또는 GET_POST 문자열
// promiseCreator 는 프로미스를 만들어주는 함수 postsAPI.getPosts() 또는 postsAPI.getPostsById(id)
export const createPromiseThunk = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

  // thunk를 만들어주는 함수를 반환
  return (param) => async (dispatch) => {
    dispatch({ type, param });
    try {
      const payload = await promiseCreator(param);
      dispatch({
        type: SUCCESS,
        payload, // posts 또는 post
      });
    } catch (e) {
      dispatch({
        // Flux Standard Action 규칙
        type: ERROR,
        payload: e,
        error: true,
      });
    }
  };
};

// idSelector 는 함수
const defaultIdSelector = (param) => param;
// post
export const createPromiseThunkById = (
  type,
  promiseCreator,
  idSelector = defaultIdSelector
) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

  // thunk를 만들어주는 함수를 반환
  return (param) => async (dispatch) => {
    const id = idSelector(param);
    dispatch({ type, meta: id });
    try {
      const payload = await promiseCreator(param);
      dispatch({
        type: SUCCESS,
        payload, // posts 또는 post
        meta: id,
      });
    } catch (e) {
      dispatch({
        // Flux Standard Action 규칙
        type: ERROR,
        payload: e,
        error: true,
        meta: id,
      });
    }
  };
};

// type 은 createPromiseThunk의 type과 동일
// key : 각 action들 마다 관리하는 키값이 다르다. posts와 post
export const handleAsyncActions = (type, key, keepData) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

  // 세가지(type, success, error) action들에 대한 리듀서 작성 및 반환
  return (state, action) => {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: reducerUtils.loading(keepData ? state[key].data : null),
        };
      case SUCCESS:
        return {
          ...state,
          [key]: reducerUtils.success(action.payload),
        };
      case ERROR:
        return {
          ...state,
          [key]: reducerUtils.error(action.payload),
        };
      default:
        return state;
    }
  };
};

// key는 posts 혹은 post
// key 안에 있는 id 객체를 업데이트 해준다
export const handleAsyncActionsById = (type, key, keepData) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

  // 세가지(type, success, error) action들에 대한 리듀서 작성 및 반환
  return (state, action) => {
    const id = action.meta;
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: reducerUtils.loading(
              keepData ? state[key][id] && state[key][id].data : null
            ),
          },
        };
      case SUCCESS:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: reducerUtils.success(action.payload),
          },
        };
      case ERROR:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: reducerUtils.error(action.payload),
          },
        };
      default:
        return state;
    }
  };
};
