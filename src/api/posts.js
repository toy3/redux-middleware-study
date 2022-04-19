// 1초 뒤에 끝나는 promise
const sleep = (n) => new Promise((resolve) => setTimeout(resolve, n));

sleep(1000).then(() => console.log("Hello World")); // 1초 뒤에 Hello World 실행

// 가짜 posts 목록 데이터
// { id, title, body }
const posts = [
  {
    id: 1,
    title: "리덕스 미들웨어를 배워봅시다.",
    body: "리덕스 미들웨어를 직접 만들어보면 이해하기가 쉽죠.",
  },
  {
    id: 2,
    title: "redux-thunk를 사용해봅시다.",
    body: "redux-thunk를 사용해서 비동기 작업을 처리해보아요.",
  },
  {
    id: 3,
    title: "redux-saga도 사용해봅시다.",
    body: "redux-saga를 사용해서 비동기 작업을 처리하는 방법도 배워볼거예요.",
  },
];

// 두 가지 비동기 함수 (가짜 api)
export const getPosts = async () => {
  await sleep(500);
  return posts;
};

export const getPostsById = async (id) => {
  await sleep(500);
  return posts.find((post) => post.id === id);
};
