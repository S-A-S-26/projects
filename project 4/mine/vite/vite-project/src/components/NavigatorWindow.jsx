import React, { useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";

export default function NavigatorWindow({ getCsrf, csrfValue, getProfile,profileData,setProfileData,fetchPosts }) {
  const navigate=useNavigate()
  // const getProfile = async () => {
  //   console.log("getProfile");
  //   let response = await fetch("/socialapp/update_profile", { method: "GET" });
  //   let value = await response.json();
  //   console.log(value)
  //   setProfileData(value)
  // };




  return (
    <div className="NavigatorWindow">
      <div>
        <div>
            <button onClick={()=>{getProfile('/Profile')}}>Profile</button>
          {/* <Link to="/Profile">
          </Link> */}
        </div>
        {/* <hr /> */}
        <div>
          <Link onClick={()=>{fetchPosts('all')}} to="/">Posts</Link>
        </div>
        {/* <hr /> */}
        <div>
          <Link to="#">Following</Link>
        </div>
        {/* <hr /> */}
        <div>
          <Link to="/AddPost">Add a Post</Link>
        </div>
        {/* <hr /> */}
      </div>
    </div>
  );
}
