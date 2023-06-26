// import React from 'react'

export default function Contact() {
  return (
    <form action="https://formspree.io/f/moqzbzny" method="post">
    <div className='contactContainer'>
        <input autoComplete='off' required placeholder='Username' name='username' type='text'/>
        <input autoComplete='off' required placeholder='Email' name='Email' type='email'/>
        <textarea name="message" placeholder="Leave Your Message Here" rows={8} cols={30}></textarea>
        <input value='Submit' type='submit'/>
    </div>
    </form>
  )
}
