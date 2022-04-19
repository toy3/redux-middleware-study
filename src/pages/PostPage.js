import React from "react";
import PostContainer from "../containers/PostContainer";

function PostPage({ match }) {
  const { id } = match.params; // URL 파라미터 조회하기. 여기의 id 값은 string 이라서 변환 해줘야 함.
  const postId = parseInt(id, 10);

  return <PostContainer postId={postId} />;
}

export default PostPage;
