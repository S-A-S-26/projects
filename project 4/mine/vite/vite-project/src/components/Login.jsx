import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login({csrfValue,getCsrf,showLogin,setLogin,fetchPosts}) {
  const navigate=useNavigate()

  const handleLogin=async(e)=>{
    e.preventDefault()
    let value=await getCsrf()
    console.log(value)
    let csrf=csrfValue()
    // let csrf='xy'
    console.log('c',csrf)
    // setLogin(false)
    console.log(document.cookie)
    let log_username=document.getElementById('log_username').value
    let log_password=document.getElementById('log_password').value
   
    // fetch('socialapp/',{method:'GET'})
    // .then((res)=>res.json())
    // .then((val)=>console.log(val))
    // fetch('http://127.0.0.10:8000/socialapp/login_user'
    fetch('/socialapp/login_user',{
                                    method:'POST',
                                    headers:{
                                             'Content-Type':'application/json',
                                             'X-CSRFToken':csrf,
                                            },
                                    body:JSON.stringify({log_username,log_password,csrf}),
                                    
                                  })
    .then((res)=>res.json())
    .then((val)=>{
      console.log(val)
      setLogin(false)
      navigate('/')
      // fetchPosts('all')
      console.log('/Posts')
    })
    .catch((err)=>{err})

  }

  return (showLogin &&
    <>
    <div className="mask" onClick={()=>{setLogin(false)}}></div>
    <div className='LoginView'>
      <form >
            <div>
                <h1>Login</h1>
                <div>
                    <label>Username</label><input required={true} type='text' id='log_username' name='log_username'/>
                </div>
                <div>
                    <label>Password</label><input autoComplete='on' required={true} type='password' id='log_password' name='log_password'/>
                </div>
                <div style={{justifyContent:'center'}}>
                    <button onClick={handleLogin} className="primary-btn" type='submit' id='log_submit' name='log_submit'>Login</button>
                </div>
            </div>
      </form>
    </div>
    </>
  )
}
