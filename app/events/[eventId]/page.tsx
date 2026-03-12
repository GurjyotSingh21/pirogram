import { getEventById } from "@/lib/actions/event.actions"
import { notFound } from "next/navigation"
import TicketButton from "@/components/shared/TicketButton"
import { auth } from "@clerk/nextjs/server"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type PageProps = {
  params: Promise<{
    eventId: string
  }>
}

export default async function EventDetailsPage({ params }: PageProps) {

  const { eventId } = await params

  const { userId } = await auth()

  const event = await getEventById(eventId, userId ?? undefined)

  if (!event) return notFound()

  const userTicket = event.tickets?.[0]

  const priceLabel = event.price === 0 ? "FREE" : `$${event.price}`

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">

      <img
        src={event.imageUrl == "" ? "https://i.pinimg.com/736x/de/28/96/de2896f49e448617783bee49e7510d55.jpg" : event.imageUrl}
        className="w-full h-100 object-cover rounded-xl"
      />

      <div className="mt-8 space-y-6">

        <h1 className="text-4xl font-bold">
          {event.title}
        </h1>

        <div className='flex gap-2'>
          <div className='h-full w-fit py-1 px-3  bg-green-300 text-green-800 rounded-full font-bold text-xs'>{priceLabel}</div>
          <div className='h-full w-fit py-1 px-3  bg-gray-300 text-gray-600 rounded-full font-bold text-xs'>{event.category.charAt(0).toUpperCase()}{event.category.substring(1)}</div>
        </div>

        <p className="text-gray-600">
          {event.description}
        </p>

        <div className="flex gap-6 text-gray-700">

          <span className="flex items-center justify-between">
            <img className="h-5" src="/assets/icons/location.svg" alt="" />
            {event.location}
          </span>

          <span className="flex items-center justify-between">
            <img className="h-5" src="/assets/icons/calendar.svg" alt="" />
            {new Date(event.startDate).toLocaleString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit"
            })}
          </span>

        </div>

        <div className="flex items-center gap-3">

          <img
            src={event.creator.imageUrl!}
            className="w-10 h-10 rounded-full object-cover"
          />

          <span>
            Created by {event.creator.firstName} {event.creator.lastName}
          </span>

        </div>


        {userTicket ? (
          <Link href={`/tickets/${userTicket.ticketCode}`}>
            <Button>
                Show Ticket
            </Button>
          </Link>
        ) : (
          <TicketButton eventId={event.id} />
        )}

      </div>

    </div>
  )
}