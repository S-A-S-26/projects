import { useEffect,useRef } from 'react'
import './App.scss'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Resume from './assets/Resume.pdf'

function App() {
  const img1=useRef<HTMLImageElement>(null)
  const img2=useRef<HTMLImageElement>(null)
  const heading=useRef<HTMLHeadingElement>(null)
  const imgHolder=useRef<HTMLDivElement>(null)
  const main=useRef<HTMLDivElement>(null)
  const ham=useRef<HTMLDivElement>(null)
  const mobileNav=useRef<HTMLDivElement>(null)
  // const preloader=useRef<HTMLDivElement>(null)
  // const section1=useRef<HTMLDivElement>(null)
  // const section2=useRef<HTMLDivElement>(null)
  // const section3=useRef<HTMLDivElement>(null)
  // const section4=useRef<HTMLDivElement>(null)

  // useEffect(()=>{
  //       preloader.current?preloader.current.style.height="0vh":''
  //       setTimeout(()=>{
  //         preloader.current?preloader.current.style.display="none":''
          
  //       },500)

  //   // window.onload=()=>{
  //   //   preloader.current?preloader.current.style.height="0vh":''
  //   //   setTimeout(()=>{
  //   //     preloader.current?preloader.current.style.display="none":''
  //   //   },500)
  //   // }
  // },[img1,img2])

  const animate = (elem:Element) => {
    elem.classList.add("animate");
    elem.classList.remove("hide");
  };

  const stopAnimation = (elem:Element) => {
    elem.classList.remove("animate");
    elem.classList.add("hide");
  };

  const checkElemPresence = (elem:Element):boolean => {
    let elemInfo = elem.getBoundingClientRect();
    if (
      elemInfo.y + (elemInfo.height/2) < window.innerHeight &&
      (elemInfo.y+(elemInfo.height/2)) > 0
    ) {
      animate(elem);
      return true;
    } else {
      stopAnimation(elem);
      return false;
    }
  };

  useEffect(() => {
    main.current?main.current.onscroll=()=>{
      document.querySelectorAll(".animatable").forEach((val) => checkElemPresence(val));
      let current=''
      const sections=document.querySelectorAll('[data-cat="section"]')
      const sectionHeight=main.current?main.current.clientHeight:0
      const yPos=main.current?main.current.scrollTop:0
      img1.current?img1.current.style.marginTop=(yPos*1)+'px':''
      heading.current?heading.current.style.marginTop=(yPos*1)+'px':''
      img2.current?img2.current.style.marginTop=(yPos*0.5)+'px':''
      sections.forEach((section)=>{
        if (yPos>=(section as HTMLDivElement).offsetTop-(sectionHeight/3) ){
          current=(section as HTMLDivElement).id
        }
      })
      console.log(current)
      const li=document.querySelectorAll('[data-attr]')
      li.forEach((item)=>{
        if((item as HTMLLIElement).dataset.attr===current){
          item.classList.add('activeLink')
        }else{
          item.classList.remove('activeLink')
        }
      })
    }:null
  

  }, [])



function scrollToElem(elem:React.MouseEvent<HTMLAnchorElement>){
  const sections=document.querySelectorAll('[data-cat="section"]')
  sections.forEach((sec)=>{
    // console.log(sec.id,(elem.target as HTMLElement).dataset.attr)
    console.log(sec.id,(elem.target as HTMLElement).dataset.an)
    if (sec.id===(elem.target as HTMLElement).dataset.an){
      sec.scrollIntoView({behavior:'smooth'})
    }
  })
  toggFunc()
}

function toggFunc(){
  console.log('click reg');
  console.log(ham.current);
  ham.current?.classList.toggle('change')
  mobileNav.current?.classList.toggle('showMobileNav')
  SetLinkasActive()
}


function SetLinkasActive(){
  let current=''
  const li=document.querySelectorAll('[data-attr]')
  const sections=document.querySelectorAll('[data-cat="section"]')
  const sectionHeight=main.current?main.current.clientHeight:0
  const yPos=main.current?main.current.scrollTop:0

  sections.forEach((section)=>{
    if (yPos>=(section as HTMLDivElement).offsetTop-(sectionHeight/3) ){
      current=(section as HTMLDivElement).id
    }
  })


  li.forEach((item)=>{
    if((item as HTMLLIElement).dataset.attr===current){
      item.classList.add('activeLink')
    }else{
      item.classList.remove('activeLink')
    }
  })
}



  return (
    <>
    {/* <div ref={preloader} className='preloader'></div> */}
    <header>
      <Navbar/>
    </header>
    <main>
      <div ref={mobileNav} className='mobileNav'>
        <ul className='mobileNavList'>
            <li data-attr='home'><a  data-an='home' onClick={scrollToElem}>HOME</a></li>
            <li data-attr='skills'><a  data-an='skills' onClick={scrollToElem}>SKILLS</a></li>
            <li data-attr='projects'><a  data-an='projects' onClick={scrollToElem}>PROJECTS</a></li>
            <li data-attr='contact'><a  data-an='contact' onClick={scrollToElem}>CONTACT</a></li>
        </ul>
      </div>

      <div ref={ham} className="ham" onClick={toggFunc}>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>

      <div ref={main} id='main' className="main">
          <Hero {...{img1,img2,heading,imgHolder}}/>
      
        <div id='skills' data-cat='section' className='section'>
         <div >
             <h3>Skills</h3>
              <ol className='skillsList'>
                <li className=' animatable'>HTML</li>
                <li className=' animatable'>CSS</li>
                <li className=' animatable'>SASS</li>
                <li className=' animatable'>JAVA SCRIPT</li>
                <li className=' animatable'>TYPE SCRIPT</li>
                <li className=' animatable'>PYTHON</li>
                <li className=' animatable'>DJANGO</li>
                <li className=' animatable'>REACT</li>
                <li className=' animatable'>REDUX</li>
              </ol>
          </div> 
        </div>
        <hr/>
        
        <div id='projects' data-cat='section' className='section'>
            <h3>Projects</h3>
            <Projects/>
        </div>
       
        <div id='contact' data-cat='section' className='section createDownload'>
          <div>
            <h3>Contact</h3>
            <Contact/>
          </div>
          <a className='resume' href={Resume} download target="_blank" rel="noopener noreferrer">My Resume</a>
        </div>
      
      </div>
    </main>

    </>
  )
}

export default App
