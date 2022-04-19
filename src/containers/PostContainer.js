import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Post from "../components/Post";
import { reducerUtils } from "../lib/asyncUtils";
import { getPost, goToHome } from "../modules/posts";

function PostContainer({ postId }) {
  const { data, loading, error } = useSelector(
    (state) => state.posts.post[postId] || reducerUtils.initial()
  );
  const dispatch = useDispatch();

  useEffect(() => {
    //if (data) return; // 데이터 있을 경우 새로 불러오지 않고 싶은 경우. 근데 최신 데이터 업데이트가 안될 수 있음.
    dispatch(getPost(postId));
  }, [postId, dispatch]);

  if (loading && !data) return <div>로딩중...</div>;
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;
  return (
    <>
      <button onClick={() => dispatch(goToHome())}>홈으로 이동</button>
      <Post post={data} />
    </>
  );
}

export default PostContainer;
