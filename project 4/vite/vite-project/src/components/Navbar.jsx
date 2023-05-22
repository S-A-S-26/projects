import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function Navbar({getCsrf,setLogin,setReg,getProfile,profileData,fetchPosts}) {
  
  const navigate=useNavigate()

  const handleLogin=()=>{
    // getCsrf()
    console.log('login cliked')
    setLogin(true)
  }
  const handleRegis=()=>{
    console.log('Registration clicked')
    setReg(true)
  }
  const handleLogout=async()=>{
    let response = await fetch("/socialapp/logout_user", { method: "GET" });
    console.log(response)
    let value = await response.json();
    console.log(value)
    getProfile()
    fetchPosts("all")
    navigate('/')
  }

  return (
    <div className="navbar">
      <div className="mobileViewProfieData">
        <div className="mobileViewProfiepic"><img src={profileData.profilepic==="" || profileData.status==='User unauthenticated'?'/media/profilepic/noprofile.png':`/media/${profileData.profilepic}`} /></div>
        <div className="mobileViewProfilename">
        {profileData.status==='User unauthenticated'?'no log-in':profileData.username}
        </div>
      </div>
        <div className='logo'>Social</div>
        <nav>
        {profileData.status==='User unauthenticated'?<>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleRegis}>Register</button>
            </>:
            <button onClick={handleLogout}>Logout</button>}
            {/* <Link to="login/">
                Login
            </Link>
            <Link to="register/">
                Register
            </Link> */}
        </nav>
    </div>
  )
}
