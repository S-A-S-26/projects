import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import navProfile from '../assets/navProfile.png'
import navPosts from '../assets/navPosts.png'
import navFollowing from '../assets/navFollowing.png'
import navAddPost from '../assets/navAddPost.png'
import followinglist from '../assets/followinglist.png'


export default function NavigatorWindow({ setPageNo,currentLoc,setCurrentLoc,getCsrf, csrfValue, getProfile,profileData,setProfileData,fetchPosts,setLogin }) {
  const navigate=useNavigate()


  // useEffect(()=>{
  //   console.log('current loc useeffect form navigator window called')
  //   if (currentLoc==='Profile'){
  //     // fetchPosts('self');
      
  //     console.log("current loc from navigator window:-",currentLoc)
  //   }else if (currentLoc==='Following'){
  //     fetchPosts('following');
  //   }else if(currentLoc==='followinglist'){
  //     return
  //   }else{
  //     navigate('/')
      
  //   }
  //   setPageNo(1)
    
  // },[currentLoc])



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
    setCurrentLoc('addPost')
  }



  return (
    <div className="mobileNavigatorWindow">
      <div className="mobileNavigatorWindowList">
        <div>
            
            <button style={{height:'4rem'}} onClick={()=>{handleProfilebtn()}}><img src={navProfile} alt="Profile"/></button>
        </div>
        <div>
          <Link onClick={()=>{handlePostsbtn()}} to="/"><img src={navPosts} alt="Postimg"/></Link>
        </div>
        <div>
            <button onClick={()=>{handleFollowingbtn()}}><img src={navFollowing} alt="Following"/></button>
        </div>
        <div>
          <button onClick={()=>{handleAddPost()}}><img src={navAddPost} alt="AddPost"/></button>
        </div>
        <div>
          <Link onClick={()=>{setCurrentLoc('followinglist')}} to='/Following'><img src={followinglist} alt="followinglist"/></Link>
        </div>
      </div>
    </div>
  );
}
