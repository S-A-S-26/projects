import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Registration({setAlert,csrfValue,getCsrf,showReg,setReg}) {
  const navigate=useNavigate()
  const handleRegistration=async(e)=>{
    e.preventDefault()
    let value=await getCsrf()
    console.log(value)
    let csrf=csrfValue()
    // let csrf='xy'
    console.log('c',csrf)
    // setLogin(false)
    console.log(document.cookie)
    let Reg_username=document.getElementById('Reg_username').value
    let Reg_password=document.getElementById('Reg_password').value
    let Reg_confpassword=document.getElementById('Reg_confpassword').value

    // fetch('socialapp/',{method:'GET'})
    // .then((res)=>res.json())
    // .then((val)=>console.log(val))
    // fetch('http://127.0.0.10:8000/socialapp/login_user'
    fetch('/socialapp/register_user',{
                                    method:'POST',
                                    headers:{
                                             'Content-Type':'application/json',
                                             'X-CSRFToken':csrf,
                                            },
                                    body:JSON.stringify({Reg_username,Reg_password,Reg_confpassword,csrf}),
                                    
                                  })
    .then((res)=>res.json())
    .then((val)=>{
      console.log(val)
      setReg(false)
      if ('error' in val){
        console.log('setAlert(val.error)')
        setAlert(val.error)
      }
      navigate('/')
    })
    .catch((err)=>{err})

  }

  return (showReg &&
    <>
    <div className="mask" onClick={()=>{setReg(false)}}></div>
    <div className='LoginView'>
      
      <form >
            <div>
                <h1>Register</h1>
                <div>
                    <label>Username</label><input required={true} type='text' id='Reg_username' name='Reg_username'/>
                </div>
                <div>
                    <label>Password</label><input autoComplete='on' required={true} type='password' id='Reg_password' name='Reg_password'/>
                </div>
                <div>
                    <label>Confirm Password</label><input autoComplete='on' required={true} type='password' id='Reg_confpassword' name='Reg_confpassword'/>
                </div>
                <div style={{justifyContent:'center'}}>
                    <button onClick={handleRegistration} className="primary-btn" type='submit' id='Reg_submit' name='Reg_submit'>Register</button>
                </div>
            </div>
      </form>
    </div>
    </>
  )
}
