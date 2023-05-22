import { useEffect, useRef, useState } from 'react'
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
import Paginator from './components/Paginator'
import Alert from './components/Alert'
import MobileNavWin from './components/MobileNavWin'
import FollowingMobileView from './components/FollowingMobileView'

function App() {
  const [showLogin, setLogin] = useState(false)
  const [showReg, setReg] = useState(false)
  const [otherUserProfile,setotherUserProfile]=useState({})
  const [postHeading,setpostHeading]=useState('Posts')
  const [profileData,setProfileData] = useState(false)
  const [posts,setPosts]=useState({posts:[]})
  const [editPost,setEditPost]=useState(false)
  const [editPost_Posts,setEditPost_Post]=useState({})
  const [imgWin,setimgWin]=useState(false)
  const [previewImg,setPreviewImg]=useState([])
  const [currentLoc,setCurrentLoc]=useState('Posts')
  const [pageno,setPageNo]=useState(1)
  const [totalPages,setTotalPages]=useState(1)
  const otherProfileData=useRef()
  const currentLocOtherProfileFlag=useRef()
  const [alertMessage,setAlertMessage]=useState(false)

  const navigate=useNavigate()

  useEffect(() => {

    getProfile();
    fetchPosts("all");
    if (showReg===true || showLogin===true){
      document.body.style.overflow='hidden'
    }else{
      document.body.style.overflow='auto'
    }
    
    // setInterval()
  }, [showReg,showLogin]);

  // useEffect(()=>{
  //   console.log('app.jsx useEffect')
  //   console.log('profiledata',profileData)
  // },[profileData])

  const getCsrf=async()=>{
    try {
      let res= await fetch('/socialapp/getCSRF',{method:'GET'})
      console.log(res)
      return res.json()
      
    } catch (error) {
      console.log(error)
    }


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
    let value
    try {
      let response = await fetch(`/socialapp/getProfile/${type}`, { method: "GET" });
      console.log(response)
      value = await response.json();
      
    } catch (error) {
      console.log(error)
    }


    if (type==='self'){
      setProfileData(value)
    }
    // else{
    //   setotherUserProfile(value)
      
    // }
  };

 const getOtherProfile =(type)=>{
   console.log("getOtherProfile functin from app.jsx")
   setCurrentLoc('otherUserProfile')
   otherProfileData.current=type
   fetchOtherUserProfile()
 }
 
 async function fetchOtherUserProfile(){

  let value
  if (currentLocOtherProfileFlag){
  try {
    let response = await fetch(`/socialapp/getOtherProfile/${otherProfileData.current}`, { method: "GET" });
    value = await response.json();
    
  } catch (error) {
    console.log(error)
  }

    setotherUserProfile(value)
  }
}


 useEffect(()=>{
  if (currentLoc==="otherUserProfile"){
    fetchOtherUserProfile()
    currentLocOtherProfileFlag.current=true
  }else{
    currentLocOtherProfileFlag.current=false
  }
 },[currentLoc,otherProfileData.current])

  useEffect(()=>{
    if (Object.keys(otherUserProfile).length !== 0){
      navigate("/OtherProfile")
      fetchPosts(otherUserProfile.id)
    }
  },[otherUserProfile])

  const fetchPosts=async(type='self')=>{
    let value
    try {
      let response = await fetch(`/socialapp/getPosts/${type}/${pageno}`, { method: "GET" });
      value = await response.json();
      
    } catch (error) {
      console.log(error)
    }

    setPosts(value)
    setTotalPages(value.totalPages)


    
    console.log(type)
    if (type==='following'){
      setpostHeading('Following')
      navigate('/')
    }else if (type==='self'){
      console.log('my Posts')
      setpostHeading('My Posts')
      navigate('/Profile')
    }else if(typeof type == 'number'){
      console.log('set POST heading other user profile')
      setpostHeading(`${otherUserProfile.username}'s posts`)
      navigate('/OtherProfile')
    }else{
      console.log('elseee')
      setpostHeading('Posts')
      navigate('/')
    }
    // navigate(path)

  }

  useEffect(()=>{
    console.log('pageno',pageno)
    if (currentLoc==="Profile"){
      console.log('fetchPost through setPageno for Profile')
      fetchPosts('self')
    }else if (currentLoc==="Following"){
      console.log('fetchPost through setPageno for following')
      fetchPosts('following')
    }else if (currentLoc==='otherUserProfile'){
      console.log('fetchPost through setPageno for otherUserProfile')
      fetchPosts(otherUserProfile.id)
    }else{
      console.log('fetchPost through setPageno for Posts')
      fetchPosts('all')
    }
    window.scrollTo(0,0)
  },[pageno])

  useEffect(()=>{
    console.log('postsMain',posts)
    
  },[posts])









  const refresh=()=>{
    console.log('Post Heading',postHeading)
    console.log('refresh')
    if (postHeading==='Posts'){
      fetchPosts("all");
    }else if (postHeading==='Following'){
      console.log('following')
      fetchPosts('following')
    }else if (postHeading==='My Posts'){
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
    try {
      let response = await fetch("/socialapp/updatePost", opt);
      let value = await response.json();
      console.log(value);
      
    } catch (error) {
      console.log(error)
    }
    refresh();
    if ('otherProfile' in from){
      getOtherProfile(`profile_id:${from.otherProfile}`)
    }
  };


  const setAlert=(msg)=>{
    setAlertMessage(msg)
    setTimeout(()=>{
      setAlertMessage(false)
    },2000)
  }
  

  return (
    <div className="App">
      {/* <Router basename='/socialapp'> */}
        <Navbar {...{getCsrf,setLogin,setReg,getProfile,profileData,fetchPosts}}/>
        <Login {...{setAlert,showLogin,setLogin,getCsrf,csrfValue,fetchPosts}}/>
        <Registration {...{setAlert,showReg,setReg,getCsrf,csrfValue}}/>
        <EditPost {...{editPost,setEditPost,editPost_Posts,getCsrf,csrfValue,fetchPosts}}/>
        <ImagePreview {...{imgWin,setimgWin,previewImg}}/>
        <Alert {...{alertMessage}}/>
        

        <div className='containerdiv'>
          <NavigatorWindow {...{setPageNo,currentLoc,setCurrentLoc,getCsrf,csrfValue,getProfile,setProfileData,fetchPosts,profileData,setLogin}}/>
          <div className='mainContent'>
            <Routes>
              <Route exact path='/AddPost' element={<AddPost {...{getCsrf,csrfValue,fetchPosts}}/>}/>
              {/* onEnter={()=>{getProfile('/Profile');fetchPosts('all');}} */}
              {/* render={()=>{getProfile('/Profile');fetchPosts('all');}} */}
              <Route exact path='/' element={<Posts {...{totalPages,pageno,setPageNo,setPosts,getOtherProfile,handleFollow,refresh,getProfile,fetchPosts,posts,getCsrf,csrfValue,setEditPost,setEditPost_Post,setimgWin,previewImg,setPreviewImg,showReg,showLogin,postHeading,profileData,setLogin,otherUserProfile}}/>}/>
              <Route exact path='/Profile' element={<Profile {...{refresh,totalPages,setPosts,pageno,setPageNo,fetchPosts,setCurrentLoc,profileData,getProfile,fetchPosts,posts,getCsrf,csrfValue,setEditPost,setEditPost_Post,setimgWin,previewImg,setPreviewImg,showReg,showLogin,postHeading}}/>}/>
              <Route exact path='/OtherProfile' element={<OthersProfile {...{totalPages,setPosts,pageno,setPageNo, setLogin,getOtherProfile,profileData,otherUserProfile,getProfile,fetchPosts,posts,getCsrf,csrfValue,setEditPost,setEditPost_Post,setimgWin,previewImg,setPreviewImg,showReg,showLogin,postHeading,handleFollow,refresh}}/>}/>
              <Route exact path='/updateProfile' element={<EditProfile {...{getCsrf,csrfValue,getProfile,profileData}}/>}/>
              <Route exact path='/Following' element={<FollowingMobileView {...{getOtherProfile,profileData,posts}}/>}/>
              {/* <Route exact path='/Paginator' element={<Paginator {...{}}/>}/> */}
            </Routes>
            

          </div>
          <Extras {...{getOtherProfile,profileData,posts}}/>
          {/* <div className='adds'>add/other</div> */}
        </div>
        <MobileNavWin {...{setPageNo,currentLoc,setCurrentLoc,getCsrf,csrfValue,getProfile,setProfileData,fetchPosts,profileData,setLogin}}/>
      {/* </Router> */}
    </div>
  )
}

export default App
