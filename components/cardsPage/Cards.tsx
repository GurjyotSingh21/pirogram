import { Button } from '../ui/button'
import CardImage from './CardImage'
import { Event, User } from "@prisma/client"
import Link from "next/link"
import { getCategoryLabel } from '@/constants/categories'

type EventWithCreator = Event & {
  creator: User
}

type CardsProps = {
  event: EventWithCreator
}
export default function CardsPage({ event }: CardsProps) {

  const priceLabel = event.price === 0 ? "FREE" : `$${event.price}`
  return (
    <div className='h-100 w-full md:w-[320px] rounded-2xl overflow-x-auto flex-nowrap shadow-lg hover:scale-105 transition'>
      <CardImage image={event.imageUrl} />
      <div className='h-5/9 w-full flex flex-col justify-between px-9 py-5'>
        <div className='flex gap-2'>
          <div className='h-full w-fit py-1 px-3  bg-green-300 text-green-800 rounded-full font-bold text-xs'>{priceLabel}</div>
          <div className='h-full w-fit py-1 px-3  bg-gray-300 text-gray-600 rounded-full font-bold text-xs'>{getCategoryLabel(event.category)}</div>
        </div>
        <h3 className='font-semibold text-gray-600'>{new Date(event.startDate).toLocaleString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        })}</h3>
        <h1 className=' font-bold text-xl '>{event.title}</h1>
        <h3 className='font-semibold text-gray-600'>{event.creator.firstName} {event.creator.lastName}</h3>
        <Link href={`/events/${event.id}`}>
        <Button className="w-full rounded-full text-l text-white bg-gray-800 hover:bg-gray-400">View Event</Button>
        </Link>
      </div>
    </div>
  )
}
