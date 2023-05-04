import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import navProfile from '../assets/navProfile.png'
import navPosts from '../assets/navPosts.png'
import navFollowing from '../assets/navFollowing.png'
import navAddPost from '../assets/navAddPost.png'


export default function NavigatorWindow({ setPageNo,currentLoc,setCurrentLoc,getCsrf, csrfValue, getProfile,profileData,setProfileData,fetchPosts,setLogin }) {
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

  useEffect(()=>{
    console.log('current loc useeffect form navigator window called')
    if (currentLoc==='Profile'){
      // fetchPosts('self');
      
      console.log("current loc from navigator window:-",currentLoc)
    }else if (currentLoc==='Following'){
      fetchPosts('following');
    }else if(currentLoc==='followinglist'){
      return
    }else{
      navigate('/Posts')
      
    }
    setPageNo(1)
    
  },[currentLoc])



  const handleProfilebtn=()=>{
    if(profileData.status==='User unauthenticated'){
      setLogin(true)
      return
    }
    getProfile();
    console.log('setting current location in navigator handleprofilebtn func')
    setCurrentLoc('Profile')
    navigate('/Profile')
    
    window.scrollTo(0,0)
  }



  const handlePostsbtn=()=>{
    // fetchPosts('all');
    setCurrentLoc('Posts')
    fetchPosts('all')
    setPageNo(1)
    window.scrollTo(0,0)
  }



  const handleFollowingbtn=()=>{
    if(profileData.status==='User unauthenticated'){
      setLogin(true)
      return
    }
    // fetchPosts('following');
    setCurrentLoc('Following')
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
      <div className="navigatorWindowList">
        <div>
            <img src={navProfile} alt="Profile"/>
            <button onClick={()=>{handleProfilebtn()}}>Profile</button>
          {/* <Link to="/Profile">
          </Link> */}
        </div>
        {/* <hr /> */}
        <div>
          <img src={navPosts} alt="Postimg"/>
          <Link onClick={()=>{handlePostsbtn()}} to="/">Posts</Link>
        </div>
        {/* <hr /> */}
        <div>
            <img src={navFollowing} alt="Following"/>
            <button onClick={()=>{handleFollowingbtn()}}>Following</button>
        {/* <Link to="/">
        </Link> */}
        </div>
        {/* <hr /> */}
        <div>
          <img src={navAddPost} alt="AddPost"/>
          <button onClick={()=>{handleAddPost()}}>Add a Post</button>
          {/* <Link to="/AddPost">Add a Post</Link> */}
        </div>
        {/* <hr /> */}
      </div>
    </div>
  );
}
