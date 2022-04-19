// 미들웨어를 직접 작성해보자

// 함수를 리턴하는 함수를 리턴하는 함수
const myLogger = (store) => (next) => (action) => {
  console.log(action); // action은 보통 객체지만 함수일 경우도 작업가능(thunk에서).

  // next 되기 이전 상태 보여주기
  console.log("\t Prev", store.getState());

  // action을 다음 미들웨어, 다음 미들웨어가 없다면 리듀서에게 전달하겠다는 뜻.
  const result = next(action);

  // action이 미들웨어에서 모두 처리된 다음에, 그 다음 상태를 가져와서 콘솔에 출력하겠다.
  console.log("\t Next", store.getState());

  // result === CounterContainer에서 dispatch한 결과물 ( dispatch(increase()); )
  return result;
};

export default myLogger;
