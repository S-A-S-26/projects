import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";

export default function NavigatorWindow({ getCsrf, csrfValue, getProfile,profileData,setProfileData,fetchPosts,setLogin }) {
  const navigate=useNavigate()
  // const getProfile = async () => {
  //   console.log("getProfile");
  //   let response = await fetch("/socialapp/update_profile", { method: "GET" });
  //   let value = await response.json();
  //   console.log(value)
  //   setProfileData(value)
  // };

  // useEffect(() => {
  //   getProfile();
  //   // fetchPosts("all");
  //   // setInterval()
  // }, []);

  // const [loaded,setloaded]=useState(false)
  // useEffect(() => {
  //   setloaded(true)
  //   // fetchPosts("all");
  //   // setInterval()
  // }, [profileData]);

  const handleProfilebtn=()=>{
    if(profileData.status==='User unauthenticated'){
      setLogin(true)
      return
    }
    getProfile();
    fetchPosts('self');
    window.scrollTo(0,0)
  }

  const handleFollowingbtn=()=>{
    if(profileData.status==='User unauthenticated'){
      setLogin(true)
      return
    }
    fetchPosts('following');
    window.scrollTo(0,0)
  }

  const handleAddPost=()=>{
    if(profileData.status==='User unauthenticated'){
      setLogin(true)
      return
    }
    navigate("/AddPost")
  }

  return (
    <div className="NavigatorWindow">
      <div className="navProfilepic">
      {/* style={{display:loaded?'block':'none',}} */}
        <div >
          {profileData?
          <img src={profileData.profilepic==="" || profileData.status==='User unauthenticated'?'/media/profilepic/noprofile.png':`/media/${profileData.profilepic}`} />
          :'no data'}
          {/* <img src={profileData.status!=='User unauthenticated'?`/media/${profileData.profilepic}`:'/media/profilepic/noprofile.png'}/> */}
        </div>
        <b>{profileData.status==='User unauthenticated'?'User not logged-in':profileData.username}</b>
      </div>
      <div>
        <div>
            <button onClick={()=>{handleProfilebtn()}}>Profile</button>
          {/* <Link to="/Profile">
          </Link> */}
        </div>
        {/* <hr /> */}
        <div>
          <Link onClick={()=>{fetchPosts('all');window.scrollTo(0,0)}} to="/">Posts</Link>
        </div>
        {/* <hr /> */}
        <div>
            <button onClick={()=>{handleFollowingbtn()}}>Following</button>
        {/* <Link to="/">
        </Link> */}
        </div>
        {/* <hr /> */}
        <div>
          <button onClick={()=>{handleAddPost()}}>Add a Post</button>
          {/* <Link to="/AddPost">Add a Post</Link> */}
        </div>
        {/* <hr /> */}
      </div>
    </div>
  );
}
