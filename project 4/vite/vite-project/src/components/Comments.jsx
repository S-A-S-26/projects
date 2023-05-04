import React from "react";

export default function Comments({
  post,
  getCsrf,
  csrfValue,
  fetchPosts,
  fetchComment,
  submitComment,
}) {

  return (
    <div className="comments ">
      <textarea required id={`commentText${post.id}`}></textarea>
      <button
        onClick={() => {
          submitComment("add", post.id,post.page);
        }}
        className="primary-btn"
      >
        Add Comment
      </button>
    </div>
  );
}
