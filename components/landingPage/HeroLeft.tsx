"use client"

import { Button } from '../ui/button'

const HeroLeft = () => {

  const scrollToEvents = () => {
    const section = document.getElementById("events-section")

    section?.scrollIntoView({
      behavior: "smooth"
    })
  }

  return (
    <div className='px-20 flex flex-col items-start py-10'>
      <h1 className='text-5xl font-bold mb-10 leading-[1.1]'>Host, Connect, Celebrate: Your Events, Our Platform!</h1>
      <h3 className='text-lg font-medium mb-10'>Book events that match your vibe, or better, create one yourself and become a part of our community</h3>
      <Button
        onClick={scrollToEvents}
        className="rounded-full text-l text-white bg-purple-400 hover:bg-purple-800"
      >
        Explore Now
      </Button>
    </div>
  )
}

export default HeroLeft
