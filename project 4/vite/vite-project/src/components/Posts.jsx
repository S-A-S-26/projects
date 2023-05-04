import React, { useEffect ,useState} from "react";
import { Link } from "react-router-dom";
import likeliked from "../assets/likeiconunliked.png";
import dislike from "../assets/dislike.png";
import comment from "../assets/comment.png";
import follow from "../assets/follow_.png";
import unfollow from "../assets/unfollow_.png";
import Comments from "./Comments";
import Dropdown from "./Dropdown";
import Paginator from "./Paginator";

export default function Posts({
  getProfile,
  fetchPosts,
  posts,
  getCsrf,
  csrfValue,
  setEditPost,
  setEditPost_Post,
  setimgWin,
  setPreviewImg,
  showReg,
  showLogin,
  postHeading,
  profileData,
  setLogin,
  otherUserProfile,
  handleFollow,
  refresh,
  getOtherProfile,
  setPosts,
  pageno,
  setPageNo,
  totalPages,
}) {
  useEffect(() => {
    // if (postHeading==='Posts'){
    //   getProfile();
    //   fetchPosts("all");
    // }
    window.scrollTo(0,0)
    console.log('this is profile data',profileData)
    console.log('posts.posts',posts)
    // setInterval()
  }, []);

  useEffect(()=>{
    console.log('component mount posts')
    setPageNo(1)
    return ()=>{
      console.log('component unmount posts')
      // setPosts([])

    }
  },[])
  


  // useEffect(() => {
  //   // fetchPosts('self')
  //   // setInterval()
  //   console.log("poposts");
  //   console.log(posts);
  // }, [posts]);

// useEffect(()=>{
  
// })
  // const refresh=()=>{
  //   console.log('refresh')
  //   if (postHeading==='Posts'){
  //     fetchPosts("all");
  //   }else if (postHeading==='Following'){
  //     console.log('following')
  //     fetchPosts('following')
  //   }else if (postHeading==='self'){
  //     fetchPosts('self')
  //   }else if (/^.*'s posts$/gm.test(postHeading)){
  //     fetchPosts(otherUserProfile.id)
  //   }
  // }

  function convertDate(_string){
    let date=new Date (Date.parse(_string))
    return date.toLocaleString("en-US",{month:"short",day:"numeric",year:"numeric",hour:'numeric',minute:'numeric'}).replace(',','')
    // .replace(/,/g,'&nbsp;')
    // return date.toLocaleDateString()
  }

  const genImage = (images) => {
    // console.log(images);
    if (images[0]==""){
      images.shift()
    }
    return images.map((image) => (
      <div>
        <img src={`/media/${image}`} />
      </div>
    ));
  };

  const handleLike = async (action, id) => {
    if(profileData.status==='User unauthenticated'){
      console.log('handlelike setLogin')
      setLogin(true)
      return
    }
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
    refresh()

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
    if (comment===''){
      return
    }
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
    refresh()
  };

  useEffect(()=>{
    setPrevCommentBox('')
  },[pageno])


  const handleComment = (id) => {
    
    console.log(prevCommentBox)
    fetchComment(id)
    // const commentDiv=document.querySelector(`#comment${id}`)
    const commentDiv=document.getElementById(`comment${id}`)
    console.log(commentDiv)
    let display=commentDiv.style.display
    if (commentDiv.classList.contains('active')){
      commentDiv.classList.remove('active')
    }
    else{
      console.log('prevCommentBox',prevCommentBox)
      if (prevCommentBox != ''){
        // const prevDiv=document.querySelector(`#comment${prevCommentBox}`)
        const prevDiv=document.getElementById(`comment${prevCommentBox}`)
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

  // const handleFollow = async (action, id) => {
  //   if(profileData.status==='User unauthenticated'){
  //     setLogin(true)
  //     return
  //   }
  //   await getCsrf;
  //   let csrf = csrfValue();
  //   const opt = {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "X-CSRFToken": csrf,
  //     },
  //     body: JSON.stringify({ actionName: "follow", action, id }),
  //   };
  //   let response = await fetch("/socialapp/updatePost", opt);
  //   let value = await response.json();
  //   console.log(value);
  //   refresh();
  // };

  const imgPreview=(images)=>{
    setimgWin(true)
    setPreviewImg(images)
  }

  return (profileData &&
    <div className="PostsDisplay">
      <h1>{postHeading}</h1>
      {/* <hr className='profileHeadinghr'/> */}
      {posts.posts.length==0?<div className="noPosts">No Posts yet...</div>:<>
      {posts.posts.map((post) => (
        <div key={post.id}>
          <div className="headingContainerpost">
            <div className="post_profilepic">
              <img src={post.profilepic !== ""?`/media/${post.profilepic}`:`/media/profilepic/noprofile.png`} alt="dp" />
            </div>
            <div className="postHeading">
              <button onClick={()=>{getOtherProfile(post.id)}}>
                <b>{post.username}</b>
              </button>
              <label>{convertDate(post.timestamp_created)}</label>
            </div>
            {post.username===post.accountUserName?
              <Dropdown {...{refresh,post,setEditPost,setEditPost_Post,getCsrf,csrfValue,fetchPosts}}/>
              :''}
          </div>
          <div className="postDescription">
            <p>{post.description}</p>
          </div>
          <div
            onClick={()=>{imgPreview(post.post_images)}}
            style={{ display: post.post_images[0] === "" && post.post_images.length == 1 ? "none" : "flex" }}
            className="postDisplay_img"
          >
            {post.post_images[0] === "" && post.post_images.length == 1 ? "" : genImage(post.post_images)}
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
              {/* {console.log("profileData.status",profileData.status,profileData)} */}
              <button disabled={profileData.status==='User unauthenticated' && post.comments===0?true:false} className="commentButton" onClick={()=>{handleComment(post.id)}}>
                <img src={comment} />
                <span className="commentSpan">{post.comments}</span>
              </button>
            </div>
            <div>
              {post.followers.includes(post.accountUserName) ? (
                <button disabled={post.accountUserName===post.username?true:false} onClick={() => handleFollow("unfollow", post.username)}>
                  <img src={unfollow} />
                </button>
              ) : (
                <button disabled={post.accountUserName===post.username?true:false} onClick={() => handleFollow("follow", post.username)}>
                  <img src={follow} />
                </button>
              )}
            </div>
          </div>
          <div className="commentsDiv" id={`comment${post.id}`}>
            {profileData.status==='User unauthenticated'?"":
            <Comments {...{post,getCsrf,csrfValue,fetchPosts,fetchComment,submitComment}}/>
          }
            <hr />
            {comments.map((comment)=>(
              <div className="commentDispContainer" key={comment.id}>
                <div className="commentHeading">
                  <div className="commentHeadingLeft">
                    <div className="commentPic"><img src={comment.profilepic !== ""?`/media/${comment.profilepic}`:`/media/profilepic/noprofile.png`} alt="dp" /></div>
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
          </>  }
          <Paginator {...{totalPages,pageno,setPageNo}}/>
    </div>
  );
}
