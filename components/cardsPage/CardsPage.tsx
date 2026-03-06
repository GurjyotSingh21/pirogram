import React from 'react'
import SearchBar from './SearchBar'
import Cards from './Cards'

const CardsPage = () => {
  return (
    <div className=' h-fit w-screen'>
      <SearchBar />
      <div className=' flex flex-wrap items-center gap-14 px-50 py-15'>
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        
      </div>
    </div>
  )
}

export default CardsPage
