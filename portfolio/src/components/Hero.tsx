import parallaxv2 from '../assets/parallaxv2.png'
import parallaxv1 from '../assets/parallaxv1.png'

interface props{
  img1:React.RefObject<HTMLImageElement>,
  img2:React.RefObject<HTMLImageElement>,
  heading:React.RefObject<HTMLHeadingElement>,
  imgHolder:React.RefObject<HTMLDivElement>,
}

export default function Hero({img1,img2,heading,imgHolder}:props) {

  
  return (
    <>
          <div ref={imgHolder} id='home' data-cat='section' className="imageHolder">
            <img ref={img1} className="img1" src={parallaxv2}/>
            <img ref={img2} className="img2" src={parallaxv1}/>
            <div className='mainHeading'>
              <h2 ref={heading}><span className='intro'>Welcome</span> <br/><span className='name'>I'm Sujit</span> <br/><span className='desig'>A full stack developer</span></h2>
            </div>
            
        </div>
 
    </>
  )
}
