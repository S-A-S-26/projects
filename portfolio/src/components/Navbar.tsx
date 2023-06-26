// import {useEffect} from 'react'

export default function Navbar() {

    
  return (
    <div className='navbar'>
        <div className="logo">
            <h1>S.A.S</h1>
        </div>
        <nav>
            <li data-attr='home'><a href='#home'>HOME</a></li>
            <li data-attr='skills'><a href='#skills'>SKILLS</a></li>
            <li data-attr='projects'><a href='#projects'>PROJECTS</a></li>
            <li data-attr='contact'><a href='#contact'>CONTACT</a></li>
        </nav>
        
    </div>
  )
}
