import { delay, put, takeEvery, takeLatest } from "redux-saga/effects";

////// ducks 패턴 모듈

////// [ 액션 타입 ]
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";
const INCREASE_ASYNC = "INCREASE_ASYNC";
const DECREASE_ASYNC = "DECREASE_ASYNC";

////// [ 액션 생성함수 ]
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });
export const increaseAsync = () => ({ type: INCREASE_ASYNC });
export const decreaseAsync = () => ({ type: DECREASE_ASYNC });

////// [ saga 작성 ] generator 함수를 사용해서 선언한다.
// effects는 yield를 해주어야 한다.
function* increaseSaga() {
  yield delay(1000); // effects를 yield 한다.
  yield put(increase()); // put은 dispatch 와 비슷한 것.
}

function* decreaseSaga() {
  yield delay(1000);
  yield put(decrease());
}

// 내보내줘야 한다. rootSaga를 만들기 위해.
export function* counterSaga() {
  yield takeEvery(INCREASE_ASYNC, increaseSaga); // 추후 INCREASE_ASYNC 액션이 dispatch 될 때마다 increaseSaga 함수를 실행해준다.
  yield takeLatest(DECREASE_ASYNC, decreaseSaga); // 추후 DECREASE_ASYNC 액션이 dispatch 될 때 가장 마지막으로 들어오면 액션에 대해서만 decreaseSaga 함수를 실행해준다. 빨리 여러번 클릭하면 딱 1만 마이너스됨.
}

////// [ 초기상태 ]
const initialState = 0;

////// [ 리듀서 ]
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
