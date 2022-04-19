import axios from "axios";

// 두 가지 비동기 함수 (가짜 api)
export const getPosts = async () => {
  // const response = await axios.get("http://localhost:4000/posts");
  // 웹팩 proxy 설정 후
  const response = await axios.get("/posts");
  return response.data;
};

export const getPostsById = async (id) => {
  // const response = await axios.get(`http://localhost:4000/posts/${id}`);
  // 웹팩 proxy 설정 후
  const response = await axios.get(`/posts/${id}`);
  return response.data;
};
