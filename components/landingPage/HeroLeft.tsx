import React from 'react'
import { Button } from '../ui/button'

const HeroLeft = () => {
  return (
    <div className='px-20 flex flex-col items-start py-10'>
      <h1 className='text-5xl font-bold mb-10 leading-[1.1]'>Host, Connect, Celebrate: Your Events, Our Platform!</h1>
      <h3 className='text-lg font-medium mb-10'>Book and learn helpful tips from 3,168+ mentors in world class companies with our global community</h3>
      <Button className="rounded-full text-l text-white bg-purple-400 hover:bg-purple-800">Explore Now</Button>
    </div>
  )
}

export default HeroLeft
