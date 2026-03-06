import React from 'react'

const SearchBar = () => {
  return (
    <div className='flex items-center px-50  gap-5'>
        <div className='h-fit w-1/2 rounded-full bg-gray-400 px-5 py-2 '>Search</div>
        <div className='h-fit w-1/2 rounded-full bg-gray-400 px-5 py-2 '>Category</div>
      </div>
  )
}

export default SearchBar
