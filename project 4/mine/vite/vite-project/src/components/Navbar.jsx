import { Link } from "react-router-dom"

export default function Navbar({getCsrf,setLogin,setReg}) {

  const handleLogin=()=>{
    // getCsrf()
    console.log('login cliked')
    setLogin(true)
  }
  const handleRegis=()=>{
    console.log('Registration clicked')
    setReg(true)
  }

  return (
    <div className="navbar">
        <div className='logo'>Social</div>
        <nav>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleRegis}>Register</button>
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
