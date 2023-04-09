import { useState } from 'react'
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

function App() {
  const [showLogin, setLogin] = useState(false)
  const [showReg, setReg] = useState(false)
  const [profileData,setProfileData] = useState({})
  const [posts,setPosts]=useState([])
  const navigate=useNavigate()


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
    
  const getProfile = async (path) => {
    console.log("getProfile");
    let response = await fetch("/socialapp/update_profile", { method: "GET" });
    console.log(response)
    let value = await response.json();
    console.log(value)
    setProfileData(value)
    navigate(path)
  };

  const fetchPosts=async(type='self')=>{
    console.log("fetchPosts");
    let response = await fetch(`/socialapp/getPosts/${type}`, { method: "GET" });
    console.log(response)
    let value = await response.json();
    console.log(value)
    setPosts(value)
    // navigate(path)

  }

  

  return (
    <div className="App">
      {/* <Router basename='/socialapp'> */}
        <Navbar {...{getCsrf,setLogin,setReg}}/>
        <Login {...{showLogin,setLogin,getCsrf,csrfValue}}/>
        <Registration {...{showReg,setReg,getCsrf,csrfValue}}/>
       
        <div className='containerdiv'>
          <NavigatorWindow {...{getCsrf,csrfValue,getProfile,setProfileData,fetchPosts}}/>
          <div className='mainContent'>
           
            <Routes>
              <Route exact path='/AddPost' element={<AddPost {...{getCsrf,csrfValue}}/>}/>
              <Route exact path='/' onEnter={()=>{getProfile('/Profile');fetchPosts('all');}} element={<Posts {...{getProfile,fetchPosts,posts,getCsrf,csrfValue}}/>}/>
              <Route exact path='/Profile' element={<Profile {...{profileData}}/>}/>
              <Route exact path='/updateProfile' element={<EditProfile {...{getCsrf,csrfValue,getProfile,profileData}}/>}/>
            </Routes>
            

          </div>
          <div className='adds'>add/other</div>
        </div>
      {/* </Router> */}
    </div>
  )
}

export default App
