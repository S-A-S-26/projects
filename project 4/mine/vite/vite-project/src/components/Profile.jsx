import React from 'react'
import { Link } from 'react-router-dom'
import edit from './../assets/edit.png'
import Posts from './Posts'

export default function Profile({profileData,getProfile,fetchPosts,posts,getCsrf,csrfValue,setEditPost,setEditPost_Post,setimgWin,previewImg,setPreviewImg,showReg,showLogin,postHeading}) {
  console.log(profileData)
  console.log(profileData.followers)
  console.log(profileData.followers.length)
  return (
    <>
    <div className = "displayProfile">
      <h1>Profile</h1>
      <hr className='profileHeadinghr'/>
        <Link to='/updateProfile'><img src={edit}></img></Link>
        <div className="profileContent">
          <div className="profilePicDisp">
            <img src={profileData.profilepic !== ""?`/media/${profileData.profilepic}`:`/media/profilepic/noprofile.png`}/>
          </div>
          <hr/>
          <div className='follow_unfollow' style={{display:profileData.profile_user?'none':'block'}}>
            {!profileData.profile_user?<button className="primary-btn">Follow</button>:''}
          </div>
          <hr/>
          <div className='followersfollowing'>
            <div>
              <label>{`${profileData.followers.length}`}</label>
              <b>Followers</b>
            </div>
            <div>
              <label>{`${profileData.following.length}`}</label>
              <b>Following</b>
            </div>
          </div>
          <div style={{display:profileData.status==null || profileData.status==='' ?'none':'block'}}>
            <hr/>
              <div className='profileStatus'>
                <label>{profileData.status==null?'':`'${profileData.status}'`}</label>
              </div>
            <hr/>
          </div>
        </div>
    </div>
    <Posts {...{getProfile,fetchPosts,posts,getCsrf,csrfValue,setEditPost,setEditPost_Post,setimgWin,previewImg,setPreviewImg,showReg,showLogin,postHeading}}/>
    </>
  )
}
