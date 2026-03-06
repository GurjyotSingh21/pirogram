import { Button } from '../ui/button'
import CardImage from './CardImage'
const Cards = () => {
  return (
    <div className='h-100 w-3/10 rounded-2xl overflow-x-auto flex-nowrap shadow-lg hover:scale-105 transition'>
          <CardImage />
          <div className='h-5/9 w-full flex flex-col justify-between px-9 py-5'>
            <div className='flex gap-2'>
                <div className='h-full w-fit py-1 px-3  bg-green-300 text-green-800 rounded-full font-bold text-xs'>$100</div>
                <div className='h-full w-fit py-1 px-3  bg-gray-300 text-gray-600 rounded-full font-bold text-xs'>Development</div>
            </div>
            <h3 className='font-semibold text-gray-600'>Tue, Jan 2, 4:30 PM</h3>
            <h1 className=' font-bold text-xl '>Coding Universe 2026</h1>
            <h3 className='font-semibold text-gray-600'>Faizan | JS Mastery</h3>
            <Button className="rounded-full text-l text-white bg-gray-800 hover:bg-gray-400">View Event</Button>
          </div>
        </div>
  )
}

export default Cards
