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
// promiseCreator 는 프로미스를 만들어주는 함수 getPosts() 또는 getPostsById(id)
export const createPromiseThunk = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCESS`, `${type}_ERROR`];

  // thunk를 만들어주는 함수를 반환
  return (param) => async (dispatch) => {
    dispatch({ type });
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
