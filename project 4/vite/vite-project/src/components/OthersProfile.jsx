import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import edit from './../assets/edit.png'
import Posts from './Posts'

export default function OthersProfile({totalPages,setPosts,pageno,setPageNo,setLogin,profileData,otherUserProfile,getProfile,fetchPosts,posts,getCsrf,csrfValue,setEditPost,setEditPost_Post,setimgWin,previewImg,setPreviewImg,showReg,showLogin,postHeading,handleFollow,refresh,getOtherProfile}) {
  // console.log(otherUserProfile)
  // console.log(otherUserProfile.followers)
  // console.log(otherUserProfile.followers.length)

  // useEffect(()=>{
  //   console.log('fetching other user profile')
  //   getProfile(`Post:${otherUserProfile.id}`);
  // },[otherUserProfile])
  const profile=()=>{

  }

  return (
    <>
    <div className = "displayProfile">
      <h1>Profile</h1>
      <hr className='profileHeadinghr'/>
        {/* <Link to='/updateProfile'><img src={edit}></img></Link> */}
        <div className="profileContent">
          <div className="profilePicDisp">
            <img src={otherUserProfile.profilepic !== ""?`/media/${otherUserProfile.profilepic}`:`/media/profilepic/noprofile.png`}/>
          </div>
          <div style={{textAlign: 'center',fontSize: '1.5rem',marginBottom: '1rem'}}>
            <b>{otherUserProfile.username}</b>
          </div>
          <hr/>
          <div className='follow_unfollow' style={{display:profileData.username===otherUserProfile.username?'none':'block'}}>
            {profileData.username!==otherUserProfile.username?otherUserProfile.followers.includes(profileData.username)?<button onClick={() =>{handleFollow("unfollow", otherUserProfile.username,{'otherProfile':otherUserProfile.id})}} className="primary-btn">Unfollow</button>:<button onClick={() => {handleFollow("follow", otherUserProfile.username,{'otherProfile':otherUserProfile.id})}} className="primary-btn">Follow</button>:''}
          </div>
          <hr/>
          <div className='followersfollowing'>
            <div>
              <label>{`${otherUserProfile.followers.length}`}</label>
              <b>followers</b>
            </div>
            <div>
              <label>{`${otherUserProfile.following.length}`}</label>
              <b>following</b>
            </div>
          </div>
          <div style={{display:otherUserProfile.status==null || otherUserProfile.status==='' ?'none':'block'}}>
            <hr/>
              <div className='profileStatus'>
                <label>{otherUserProfile.status==null?'':`'${otherUserProfile.status}'`}</label>
              </div>
            <hr/>
          </div>
        </div>
    </div>
    <Posts {...{totalPages,getOtherProfile,handleFollow,refresh,getProfile,fetchPosts,posts,getCsrf,csrfValue,setEditPost,setEditPost_Post,setimgWin,previewImg,setPreviewImg,showReg,showLogin,postHeading,profileData,setLogin,otherUserProfile,setPosts,pageno,setPageNo}}/>
    </>
  )
}
