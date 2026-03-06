import React from 'react'
import HeroLeft from './HeroLeft'
import HeroRight from './HeroRight'

const HeroPage = () => {
  return (
    <div className='h-fit w-screen bg-gray-100 flex flex-nowrap items-center justify-between px-30 py-10'>
      <div className=' h-fit w-1/2'>
        <HeroLeft />
      </div>
      <div className='h-fit w-1/2'>
        <HeroRight />
      </div>
    </div>
  )
}

export default HeroPage
