import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'
import Navbar from './components/Navbar'
import { BrowserRouter as Router , Routes, Route, useNavigate} from "react-router-dom"
import Login from './components/Login'
import NavigatorWindow from './components/NavigatorWindow'
import Profile from './components/Profile'
import EditProfile from './components/EditProfile'
import Registration from './components/Registration'
import Posts from './components/Posts'
import AddPost from './components/AddPost'
import EditPost from './components/EditPost'
import ImagePreview from './components/ImagePreview'
import OthersProfile from './components/OthersProfile'
import Extras from './components/Extras'

function App() {
  const [showLogin, setLogin] = useState(false)
  const [showReg, setReg] = useState(false)
  const [otherUserProfile,setotherUserProfile]=useState({})
  const [postHeading,setpostHeading]=useState('Posts')
  const [profileData,setProfileData] = useState(false)
  const [posts,setPosts]=useState([])
  const [editPost,setEditPost]=useState(false)
  const [editPost_Posts,setEditPost_Post]=useState({})
  const [imgWin,setimgWin]=useState(false)
  const [previewImg,setPreviewImg]=useState([])
  const navigate=useNavigate()

  useEffect(() => {

    getProfile();
    fetchPosts("all");
    
    // setInterval()
  }, [showReg,showLogin]);

  // useEffect(()=>{
  //   console.log('app.jsx useEffect')
  //   console.log('profiledata',profileData)
  // },[profileData])

  const getCsrf=async()=>{
      console.log('getCSRF called')
      let res= await fetch('/socialapp/getCSRF',{method:'GET'})
      console.log(res)
      return res.json()
      // fetch('getCSRF',{method:'GET'})
      // .then((res)=>res.json())
      // .then((value)=>{
      //   console.log('csrfresvalue')
      //   console.log(value)
        
      // })
      // .catch((err)=>{console.log(err)})

    }
 
  const csrfValue=()=>{
    let cookie =decodeURIComponent(document.cookie)
    cookie=cookie.split(';')
    for (let i of cookie){
      if (i.indexOf('csrftoken=') == 0){
        console.log('csrfValue',i.substring(10,i.length))
        return i.substring(10,i.length)    
      }
    }
    return 'CSRF not found'
  }
    
  const getProfile = async (type='self') => {
    console.log("getProfile");
    let response = await fetch(`/socialapp/getProfile/${type}`, { method: "GET" });
    console.log(response)
    let value = await response.json();
    console.log('getProfile',value)
    if (type==='self'){
      setProfileData(value)
    }
    // else{
    //   setotherUserProfile(value)
      
    // }
  };

 const getOtherProfile =async(type)=>{
  console.log("getOtherProfile");
  let response = await fetch(`/socialapp/getOtherProfile/${type}`, { method: "GET" });
  console.log(response)
  let value = await response.json();
  console.log('getOtherProfile',value)
  setotherUserProfile(value)
 }

  useEffect(()=>{
    console.log("otherUserProfile")
    console.log(otherUserProfile)
    console.log(Object.keys(otherUserProfile).length !== 0)
    if (Object.keys(otherUserProfile).length !== 0){
      navigate("/OtherProfile")
      fetchPosts(otherUserProfile.id)
    }
  },[otherUserProfile])

  const fetchPosts=async(type='self')=>{
    console.log("fetchPosts");
    let response = await fetch(`/socialapp/getPosts/${type}`, { method: "GET" });
    console.log(response)
    let value = await response.json();
    console.log(value)
    setPosts(value)
    console.log(type)
    if (type==='following'){
      setpostHeading('Following')
      navigate('/')
    }else if (type==='self'){
      console.log('my Posts')
      setpostHeading('My Posts')
      navigate('/Profile')
    }else if(typeof type == 'number'){
      console.log('other user profile')
      setpostHeading(`${otherUserProfile.username}'s posts`)
    }else{
      console.log('elseee')
      setpostHeading('Posts')
      navigate('/')
    }
    // navigate(path)

  }

  const refresh=()=>{
    console.log('refresh')
    if (postHeading==='Posts'){
      fetchPosts("all");
    }else if (postHeading==='Following'){
      console.log('following')
      fetchPosts('following')
    }else if (postHeading==='self'){
      fetchPosts('self')
    }else if (/^.*'s posts$/gm.test(postHeading)){
      fetchPosts(otherUserProfile.id)
    }
  }

  const handleFollow = async (action, id,from={}) => {
    if(profileData.status==='User unauthenticated'){
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
      body: JSON.stringify({ actionName: "follow", action, id }),
    };
    let response = await fetch("/socialapp/updatePost", opt);
    let value = await response.json();
    console.log(value);
    refresh();
    if ('otherProfile' in from){
      getOtherProfile(`profile_id:${from.otherProfile}`)
    }
  };

  

  return (
    <div className="App">
      {/* <Router basename='/socialapp'> */}
        <Navbar {...{getCsrf,setLogin,setReg,getProfile,profileData,fetchPosts}}/>
        <Login {...{showLogin,setLogin,getCsrf,csrfValue,fetchPosts}}/>
        <Registration {...{showReg,setReg,getCsrf,csrfValue}}/>
        <EditPost {...{editPost,setEditPost,editPost_Posts,getCsrf,csrfValue,fetchPosts}}/>
        <ImagePreview {...{imgWin,setimgWin,previewImg}}/>

        <div className='containerdiv'>
          <NavigatorWindow {...{getCsrf,csrfValue,getProfile,setProfileData,fetchPosts,profileData,setLogin}}/>
          <div className='mainContent'>
            <Routes>
              <Route exact path='/AddPost' element={<AddPost {...{getCsrf,csrfValue,fetchPosts}}/>}/>
              {/* onEnter={()=>{getProfile('/Profile');fetchPosts('all');}} */}
              <Route exact path='/' render={()=>{getProfile('/Profile');fetchPosts('all');}} element={<Posts {...{getOtherProfile,handleFollow,refresh,getProfile,fetchPosts,posts,getCsrf,csrfValue,setEditPost,setEditPost_Post,setimgWin,previewImg,setPreviewImg,showReg,showLogin,postHeading,profileData,setLogin,otherUserProfile}}/>}/>
              <Route exact path='/Profile' element={<Profile {...{profileData,getProfile,fetchPosts,posts,getCsrf,csrfValue,setEditPost,setEditPost_Post,setimgWin,previewImg,setPreviewImg,showReg,showLogin,postHeading}}/>}/>
              <Route exact path='/OtherProfile' element={<OthersProfile {...{ setLogin,getOtherProfile,profileData,otherUserProfile,getProfile,fetchPosts,posts,getCsrf,csrfValue,setEditPost,setEditPost_Post,setimgWin,previewImg,setPreviewImg,showReg,showLogin,postHeading,handleFollow,refresh}}/>}/>
              <Route exact path='/updateProfile' element={<EditProfile {...{getCsrf,csrfValue,getProfile,profileData}}/>}/>
            </Routes>
            

          </div>
          <Extras {...{profileData,posts}}/>
          {/* <div className='adds'>add/other</div> */}
        </div>
      {/* </Router> */}
    </div>
  )
}

export default App
