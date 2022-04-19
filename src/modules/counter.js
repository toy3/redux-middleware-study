// ducks 패턴 모듈

// 액션 타입
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";

// 액션 생성함수
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

// 초기상태
const initialState = 0;

// 리듀서
export default function counter(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return state + 1;
    case DECREASE:
      return state - 1;
    default:
      return state;
  }
}

// 특정 thunk 함수가 dispatch 되면 1초 후에 increase 또는 decrease 를 dispatch 하기
// 두번째 파라미터 (dispatch, getState) 부터 끝까지가 thunk 함수이고,
// 첫번째 파라미터부터 끝까지는 thunk 함수를 만들어주는 함수(thunk creator) 이다.
export const increaseAsync = () => (dispatch, getState) => {
  setTimeout(() => {
    dispatch(increase());
  }, 1000);
};

export const decreaseAsync = () => (dispatch, getState) => {
  setTimeout(() => {
    dispatch(decrease());
  }, 1000);
};
