import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import navProfile from '../assets/navProfile.png'
import navPosts from '../assets/navPosts.png'
import navFollowing from '../assets/navFollowing.png'
import navAddPost from '../assets/navAddPost.png'


export default function NavigatorWindow({ setPageNo,currentLoc,setCurrentLoc,getCsrf, csrfValue, getProfile,profileData,setProfileData,fetchPosts,setLogin }) {
  const navigate=useNavigate()


  useEffect(()=>{
    console.log('current loc useeffect form navigator window called--')
    if (currentLoc==='Profile'){
      // fetchPosts('self');
      console.log('pro')
      console.log("current loc from navigator window:-",currentLoc)
    }else if (currentLoc==='Following'){
      navigate('/')
      fetchPosts('following');
      console.log('foll')
    }else if(currentLoc==='followinglist'){
      console.log('fol llist')
      return
    }else if(currentLoc==='addPost'){
      console.log('add post ----')
      navigate("/AddPost")
      return
    }else if(currentLoc==='otherUserProfile'){
      return
    }else{
      navigate('/')
      console.log('else')
      
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
    setCurrentLoc('Following')
    window.scrollTo(0,0)
  }



  const handleAddPost=()=>{
    if(profileData.status==='User unauthenticated'){
      setLogin(true)
      return
    }
    setCurrentLoc('addPost')
    
  }



  return (
    <div className="NavigatorWindow">
      <div className="navProfilepic">
        <div >
          {profileData?
          <img src={profileData.profilepic==="" || profileData.status==='User unauthenticated'?'/media/profilepic/noprofile.png':`/media/${profileData.profilepic}`} />
          :'no data'}
        </div>
        <b>{profileData.status==='User unauthenticated'?'User not logged-in':profileData.username}</b>
      </div>
      <div className="navigatorWindowList">
        <div>
            <img src={navProfile} alt="Profile"/>
            <button onClick={()=>{handleProfilebtn()}}>Profile</button>
        </div>
        <div>
          <img src={navPosts} alt="Postimg"/>
          <Link onClick={()=>{handlePostsbtn()}} to="/">Posts</Link>
        </div>
        <div>
            <img src={navFollowing} alt="Following"/>
            <button onClick={()=>{handleFollowingbtn()}}>Following</button>
        </div>
        <div>
          <img src={navAddPost} alt="AddPost"/>
          <button onClick={()=>{handleAddPost()}}>Add a Post</button>
        </div>
      </div>
    </div>
  );
}
