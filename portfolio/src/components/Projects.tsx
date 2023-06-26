
import project4 from '../assets/project4.png'
import project3 from '../assets/project3.png'
import project2 from '../assets/project2.png'
import project1 from '../assets/project1.png'
import git from '../assets/github-mark-white.png'

export default function Projects() {
    interface project{
        heading:string,
        image:string,
        description:string,
        github:string,
    }
    const projects:project[]=[
        {
            heading:"Social app",
            image:project4,
            description:"Social app based on react on the front-end and django on the backend where user's have facility to add their posts with images, edit posts, follow other user ,receive following user posts, like ,comment and more.",
            github:"https://github.com/S-A-S-26/projects/tree/main/project%204/network",
        },
        {
            heading:"Mail",
            image:project3,
            description:"Single page mail application with TypeScript on the front-end and django on back-end .Mail app similar to other mail application allowing users to register themselves and then use it to comminucate other users who are also regisered on the app. Users have access to inbox , archive , compose and sent fields.",
            github:"https://github.com/S-A-S-26/projects/tree/main/project%203%20with%20typescript/mail",
         },
         {
            heading:"Auction",
            image:project2,
            description:"An E-Commerce application based on pure django where user’s can post items to auction and sell it to the highest bidder,  Check other items on auction’s, add them to their whishlist, post comments etc. ",
            github:"https://github.com/S-A-S-26/projects/tree/main/project%202/my%20app/commerce"
         },
         {
            heading:"Wiki",
            image:project1,
            description:"Wiki app- Web app based on pure django for storing factual data about things similar to wikipedia.User can add/edit entries.The web app contents needs to be added using markdown language which is similar to wikipedia's markup. These entries are then visible on the main page for others to view/search and refer to by clicking the various topics available on the home page.",
            github:"https://github.com/S-A-S-26/projects/tree/main/project%201/mywiki"
         },
         
    ]
  return (
    <div  className='projectContainer'>
       {projects.map((project:project)=>(
        <div key={project.heading}>
        <div  className='cells'>
            <div className='projectImages'>
              <img src={project.image}/>
            </div>
            <div className='projectDetails animatable'>
                <h4>{project.heading}</h4>
                <p>{project.description}</p>
                <a href={project.github} target='_blank'><img src={git} alt="Git hub"/></a>
            </div>
        </div>   
        <hr/> 
        </div>
        ))}
         
    </div>
  )
}
