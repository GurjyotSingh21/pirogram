"use client"

import { useState } from "react"
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

  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState("")

  const filteredEvents = events.filter((event) => {

    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory =
      category === "" || event.category === category

    return matchesSearch && matchesCategory
  })

  return (
    <div id='events-section' className='h-fit w-screen'>

      <SearchBar
        onSearch={setSearchQuery}
        onCategoryChange={setCategory}
      />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-50 py-15'>

        {filteredEvents.map((event) => (
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