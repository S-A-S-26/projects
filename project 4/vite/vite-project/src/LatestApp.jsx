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
  const [pageno,setPageNo]=useState(1)
  const [postMeta,setpostMeta]=useState({})
  const [currentLoc,setCurrentLoc]=useState('Posts')

  const navigate=useNavigate()



  useEffect(()=>{
    console.log('posts-->',posts)
  },[posts])

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

  const fetchPosts=async(type='self',from='',updatePage='')=>{
    console.log("fetchPosts");

    const setpostmeta=(value)=>{
      setpostMeta({
      "next":{
        "next":value.next,
        "page":value.pageno
      },
      "previous":{
        "previous":value.previous,
        "page":value.pageno
      }
    })
  }


    if (from==="pages"){
      console.log('fetch from pages')
      let response = await fetch(`/socialapp/getPosts/${type}/${pageno}`, { method: "GET" });
      console.log(response)
      let value = await response.json();
      console.log('fetched posts',value)
      setPosts([...posts,...value.posts])
      setpostmeta(value)

    }else if (from==='update'){
      console.log('fetch from update')
      let response = await fetch(`/socialapp/getPosts/${type}/${updatePage}`, { method: "GET" });
      console.log(response)
      let value = await response.json();
      console.log('fetched posts',value)
      let postcopy=posts
      postcopy.splice((4*(updatePage-1)),4,...value.posts)
      setPosts(postcopy)
    }
    else if (from==='delete'){
      console.log('fetch from delete')
      let response=[]
      for (let i=1;i==pageno;i++){
        response.push(fetch(`/socialapp/getPosts/${type}/${i}`, { method: "GET" }));
    }
      let resp=await Promise.all(response)
      console.log('resp',resp)
      let value=Promise.all(resp.map((res)=>res.json()))
      // let value = await resp.json();
      console.log('fetched posts promsie all',value)
      setPosts(value.posts)
      setpostmeta(value)
    }
    else{
      console.log('fetch from else')
      let response = await fetch(`/socialapp/getPosts/${type}/${1}`, { method: "GET" });
      console.log(response)
      let value = await response.json();
      console.log('fetched posts',value)
      setPosts(value.posts)
      setPageNo(1)
      setpostmeta(value)
      

    }


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

  useEffect(()=>{
    console.log('pageno',pageno)
    console.log('currentloc in app.jsx pageno useEffect',currentLoc)
    if (currentLoc==='Profile'){
      fetchPosts('self','pages')
    }
    else{
      fetchPosts('all','pages')
    }
    
  },[pageno])
  useEffect(()=>{
    console.log('postsMain',posts)

  },[posts,postMeta])

  useEffect(()=>{
    window.onscroll=()=>{
      // console.log('scrolling')
      // console.log('window.scrollY',window.scrollY)
      // console.log('windowscrollY+innerht',window.scrollY+window.innerHeight)
      // console.log('offset',document.body.offsetHeight)
      // console.log('2nd cond',(window.scrollY+window.innerHeight)>=(document.body.offsetHeight-2))
      // console.log(posts)
      // if (window.scrollY===0 && postMeta.previous.previous){
      //   console.log('top scroll')
      //   setPageNo(pageno - 1)
        

      // }else 
      if ((window.scrollY+window.innerHeight)===(document.body.offsetHeight) && postMeta.next.next){
        console.log('bottom scroll')
        setPageNo(pageno + 1)
        
      }
    }
  },[postMeta])







  const refresh=(page)=>{
    console.log('refresh')
    if (postHeading==='Posts'){
      fetchPosts("all",'update',page);
    }else if (postHeading==='Following'){
      console.log('refresh following posts')
      fetchPosts('following')
    }else if (postHeading==='self'){
      fetchPosts('self','update',page)
    }else if (/^.*'s posts$/gm.test(postHeading)){
      fetchPosts(otherUserProfile.id,'update',page)
    }
  }

  const handleFollow = async (action, id,from={},page) => {
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
    refresh(page);
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
          <NavigatorWindow {...{currentLoc,setCurrentLoc,getCsrf,csrfValue,getProfile,setProfileData,fetchPosts,profileData,setLogin}}/>
          <div className='mainContent'>
            <Routes>
              <Route exact path='/AddPost' element={<AddPost {...{getCsrf,csrfValue,fetchPosts}}/>}/>
              {/* onEnter={()=>{getProfile('/Profile');fetchPosts('all');}} */}
              <Route exact path='/' render={()=>{getProfile('/Profile');fetchPosts('all');}} element={<Posts {...{getOtherProfile,handleFollow,refresh,getProfile,fetchPosts,posts,getCsrf,csrfValue,setEditPost,setEditPost_Post,setimgWin,previewImg,setPreviewImg,showReg,showLogin,postHeading,profileData,setLogin,otherUserProfile,setPosts,setPageNo}}/>}/>
              <Route exact path='/Profile' element={<Profile {...{setCurrentLoc,otherUserProfile,setLogin,refresh,handleFollow,getOtherProfile,setPageNo,setPosts,profileData,getProfile,fetchPosts,posts,getCsrf,csrfValue,setEditPost,setEditPost_Post,setimgWin,previewImg,setPreviewImg,showReg,showLogin,postHeading}}/>}/>
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
