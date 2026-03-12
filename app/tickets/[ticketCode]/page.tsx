import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

type PageProps = {
  params: Promise<{ ticketCode: string }>
}

export default async function TicketPage({ params }: PageProps) {

  const { ticketCode } = await params

  const ticket = await prisma.ticket.findUnique({
    where: {
      ticketCode
    },
    include: {
      event: true,
      user: true
    }
  })

  if (!ticket) return notFound()

  return (
    <div className="max-w-xl mx-auto py-10">

      <h1 className="text-3xl font-bold mb-6">
        Your Ticket
      </h1>

      <div className="border rounded-xl p-6 space-y-4">

        <p><strong>Event:</strong> {ticket.event.title}</p>

        <p><strong>Date:</strong> {new Date(ticket.event.startDate).toLocaleString()}</p>

        <p><strong>Location:</strong> {ticket.event.location}</p>

        <p><strong>Ticket Code:</strong> {ticket.ticketCode}</p>

      </div>
      <p className="px-5 text-xs text-shadow-2xs">Note: This ticket has been sent to your registered email</p>

    </div>
  )
}