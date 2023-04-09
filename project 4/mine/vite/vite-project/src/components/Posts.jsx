import React, { useEffect ,useState} from "react";
import { Link } from "react-router-dom";
import likeliked from "../assets/likeiconunliked.png";
import dislike from "../assets/dislike.png";
import comment from "../assets/comment.png";
import follow from "../assets/follow_.png";
import unfollow from "../assets/unfollow_.png";
import Comments from "./Comments";

export default function Posts({
  getProfile,
  fetchPosts,
  posts,
  getCsrf,
  csrfValue,
}) {
  useEffect(() => {
    getProfile("/");
    fetchPosts("all");
    // setInterval()
  }, []);

  useEffect(() => {
    // fetchPosts('self')
    // setInterval()
    console.log("poposts");
    console.log(posts);
  }, [posts]);

  const genImage = (images) => {
    // console.log(images);

    return images.map((image) => (
      <div>
        <img src={`/media/${image}`} />
      </div>
    ));
  };

  const handleLike = async (action, id) => {
    await getCsrf;
    let csrf = csrfValue();
    const opt = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrf,
      },
      body: JSON.stringify({ actionName: "like", action, id }),
    };
    let response = await fetch("/socialapp/updatePost", opt);
    let value = await response.json();
    console.log(value);
    fetchPosts("all");
  };

  const [comments,setComments]=useState([])
  const [prevCommentBox,setPrevCommentBox]=useState('')

  const fetchComment=async(id)=>{
    const opt = {
      method: "GET",
    };
    let response = await fetch(`/socialapp/getComments/${id.toString()}`, opt);
    console.log(response)
    let value = await response.json();
    setComments(value)
    console.log(value);
    // fetchPosts("all");
  }

  const delComment = async (action, id,postid) => {
    await getCsrf;
    let csrf = csrfValue();
    const opt = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrf,
      },
      body: JSON.stringify({ actionName: "comment", action, id }),
    };
    let response = await fetch("/socialapp/updatePost", opt);
    console.log(response)
    let value = await response.json();
    console.log(value);
    // fetchPosts("all");
    fetchComment(postid)
  };

  const submitComment = async (action, id) => {
    console.log(action, id);
    const comment = document.getElementById(`commentText${id}`).value;
    console.log('check comment')
    console.log(comment)
    await getCsrf;
    let csrf = csrfValue();
    const opt = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrf,
      },
      body: JSON.stringify({ actionName: "comment", action, id, comment }),
    };
    let response = await fetch("/socialapp/updatePost", opt);
    let value = await response.json();
    console.log(value);
    document.getElementById(`commentText${id}`).value=''
    // fetchPosts("all");
    fetchComment(id);
  };


  const handleComment = (id) => {
    console.log(prevCommentBox)
    fetchComment(id)
    const commentDiv=document.querySelector(`#comment${id}`)
    console.log(commentDiv)
    let display=commentDiv.style.display
    if (commentDiv.classList.contains('active')){
      commentDiv.classList.remove('active')
    }
    else{
      if (prevCommentBox != ''){
        const prevDiv=document.querySelector(`#comment${prevCommentBox}`)
        prevDiv.classList.remove('active')
      }
      commentDiv.classList.add('active')
      setPrevCommentBox(id)
      console.log(prevCommentBox)
    }
    

    if (display=='none'){
      // commentDiv.style.display='block'
      commentDiv.classList.toggle('active')
    }
    else if (display=='block'){
      commentDiv.classList.toggle('active')
      // setTimeout(()=>{commentDiv.style.display='none'},1000)
      
    }
  };

  const handleFollow = async (action, id) => {
    await getCsrf;
    let csrf = csrfValue();
    const opt = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrf,
      },
      body: JSON.stringify({ actionName: "follow", action, id }),
    };
    let response = await fetch("/socialapp/updatePost", opt);
    let value = await response.json();
    console.log(value);
    fetchPosts("all");
  };

  return (
    <div className="PostsDisplay">
      <h1>Posts</h1>
      {/* <hr className='profileHeadinghr'/> */}
      {posts.map((post) => (
        <div key={post.id}>
          <div className="headingContainerpost">
            <div className="post_profilepic">
              <img src={`/media/${post.profilepic}`} alt="dp" />
            </div>
            <div className="postHeading">
              <Link to="#">
                <b>{post.username}</b>
              </Link>
              <label>{post.timestamp_created}</label>
            </div>
          </div>
          <div className="postDescription">
            <p>{post.description}</p>
          </div>
          <div
            style={{ display: post.post_images[0] === "" ? "none" : "flex" }}
            className="postDisplay_img"
          >
            {post.post_images[0] === "" ? "" : genImage(post.post_images)}
          </div>
          <div className="postInteractionbtn">
            <div>
              {post.like.includes(post.accountUserName) ? (
                <button onClick={() => handleLike("dislike", post.id)}>
                  <img src={dislike} />
                </button>
              ) : (
                <button onClick={() => handleLike("like", post.id)}>
                  <img src={likeliked} />
                </button>
              )}
              <span>{post.like.length}</span>
            </div>
            <div>
              <button className="commentButton" onClick={()=>{handleComment(post.id)}}>
                <img src={comment} />
                <span className="commentSpan">{post.comments}</span>
              </button>
            </div>
            <div>
              {post.followers.includes(post.accountUserName) ? (
                <button onClick={() => handleFollow("unfollow", post.username)}>
                  <img src={unfollow} />
                </button>
              ) : (
                <button onClick={() => handleFollow("follow", post.username)}>
                  <img src={follow} />
                </button>
              )}
            </div>
          </div>
          <div className="commentsDiv" id={`comment${post.id}`}>
            <Comments {...{post,getCsrf,csrfValue,fetchPosts,fetchComment,submitComment}}/>
            <hr />
            {comments.map((comment)=>(
              <div className="commentDispContainer" key={comment.id}>
                <div className="commentHeading">
                  <div className="commentHeadingLeft">
                    <div className="commentPic"><img src={`/media/${comment.profilepic}`} alt="dp" /></div>
                    <div className="commenter"><b>{comment.username}</b></div>
                  </div>
                  <div style={{display:comment.accountUser===comment.username?'block':'none'}} className="commentHeadingRight">
                    <button onClick={()=>{delComment('delete',comment.id,comment.postid)}}>-</button>
                  </div>
                </div>
                <div className="dispComment"><p>{comment.comment}</p></div>
                <hr />
              </div>
            ))}
          </div>
          {/* <hr /> */}
        </div>
      ))}
    </div>
  );
}
