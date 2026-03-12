import React from 'react'
import SearchBar from './SearchBar'
import Cards from './Cards'
import { Event, User } from "@prisma/client"

type EventWithCreator = Event & {
  creator: User
}

type CardsPageProps = {
  events: EventWithCreator[]
}

const CardsPage = ({ events }: CardsPageProps) => {

  return (
    <div id='events-section' className='h-fit w-screen'>

      <SearchBar />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-50 py-15'>

        {events.map((event) => (
          <Cards
            key={event.id}
            event={event}
          />
        ))}

      </div>

    </div>
  )
}

export default CardsPage