import React, { useEffect, useState } from 'react'

export default function Paginator({totalPages,pageno,setPageNo}) {
    const maxPages=totalPages
    const currentPage=pageno
    const maxSection=Math.ceil(totalPages/3)
    const [paginatorPages,setPaginatorPages]=useState([1,2,3])
  const [currentSection,setCurrentSection]=useState(1)

 

  useEffect(()=>{
    check()
  },[currentSection,pageno])

  const clearAllElem=()=>{
    const element=document.getElementsByClassName("paginatorPages")
    Array.from(element).forEach((elem)=>{
        elem.classList.remove('activePage')
    })
  }

  const check=()=>{
    const element=document.getElementsByClassName("paginatorPages")
    Array.from(element).forEach((elem)=>{
        if (elem.innerHTML==currentPage){
            elem.classList.add('activePage')

        }else{
            elem.classList.remove('activePage')
        }
    })
  }

  const setActive=(e)=>{
    console.log('setacive')
    e.target.classList.add('activePage')
  }
  
  const handlePaginatorPage=(e)=>{
    clearAllElem(e)
    setPageNo(e.target.innerHTML)
    setActive(e)
    
  }

  const handleSection=(action)=>{
        
        if (action==='prev'){
           
            setPaginatorPages(paginatorPages.map((val)=>val-3))
            setCurrentSection(currentSection-1)
        }else if (action==="next"){
            
            
            // let pages=paginatorPages
            // pages.map()
            setPaginatorPages(paginatorPages.map((val)=>val+3))
            setCurrentSection(currentSection+1)
        }
        
  }  
  return (
    <div className='paginatorContainer'>
        <button disabled={currentSection<=1?true:false} className='previousPages primary-btn' onClick={()=>{handleSection('prev')}}>Prev</button>
            <button style={{display:paginatorPages[0]>maxPages?'none':'block'}} onClick={handlePaginatorPage} className="paginatorPages">{paginatorPages[0]}</button>
            <button style={{display:paginatorPages[1]>maxPages?'none':'block'}} onClick={handlePaginatorPage} className="paginatorPages">{paginatorPages[1]}</button>
            <button style={{display:paginatorPages[2]>maxPages?'none':'block'}} onClick={handlePaginatorPage} className="paginatorPages">{paginatorPages[2]}</button>
        <button disabled={currentSection==maxSection?true:false} className='nextPages primary-btn'onClick={()=>{handleSection('next')}}>Next</button>
    </div>
    )
}
