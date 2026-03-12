import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { getUserTickets, getUserEvents } from "@/lib/actions/profile.actions"
import { prisma } from "@/lib/prisma"

export default async function ProfilePage() {

  const { userId } = await auth()

  if (!userId) redirect("/auth/sign-in")

  const user = await prisma.user.findUnique({
    where: { id: userId }
  })

  const tickets = await getUserTickets(userId)
  const events = await getUserEvents(userId)

  return (
    <div className="max-w-6xl mx-auto py-10 px-6 space-y-12">

      {/* USER DETAILS */}

      <div className="flex items-center gap-4">

        <img
          src={user?.imageUrl || ""}
          className="w-16 h-16 rounded-full object-cover"
        />

        <div>
          <h1 className="text-2xl font-bold">
            {user?.firstName} {user?.lastName}
          </h1>

          <p className="text-gray-600">
            {user?.email}
          </p>
        </div>

      </div>

      {/* MY TICKETS */}

      <div>

        <h2 className="text-2xl font-bold mb-4">
          My Tickets
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {tickets.map((ticket) => (

            <div
              key={ticket.id}
              className="border rounded-xl p-4"
            >

              <h3 className="font-semibold">
                {ticket.event.title}
              </h3>

              <p className="text-gray-600">
                {ticket.event.location}
              </p>

              <p className="text-gray-600">
                {new Date(ticket.event.startDate).toLocaleString()}
              </p>

              <p className="font-semibold">
                Ticket Code: {ticket.ticketCode}
              </p>

            </div>

          ))}

        </div>

      </div>

      {/* MY EVENTS */}

      <div>

        <h2 className="text-2xl font-bold mb-4">
          My Events
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {events.map((event) => (

            <div
              key={event.id}
              className="border rounded-xl p-4"
            >

              <h3 className="font-semibold">
                {event.title}
              </h3>

              <p className="text-gray-600">
                {event.location}
              </p>

              <p className="text-gray-600">
                {new Date(event.startDate).toLocaleString()}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}