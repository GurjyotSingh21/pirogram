import { getEventById } from "@/lib/actions/event.actions"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"

type PageProps = {
  params: Promise<{
    eventId: string
  }>
}

export default async function EventDetailsPage({ params }: PageProps) {

  const { eventId } = await params

  const event = await getEventById(eventId)

  if (!event) return notFound()

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

        <p className="text-gray-600">
          {event.description}
        </p>

        <div className="flex gap-6 text-gray-700">

          <span>
            {event.location}
          </span>

          <span>
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
            className="w-10 h-10 rounded-full"
          />

          <span>
            Created by {event.creator.firstName} {event.creator.lastName}
          </span>

        </div>
        
        <Button>Buy Ticket</Button>

      </div>

    </div>
  )
}