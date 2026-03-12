import { prisma } from "@/lib/prisma"
import { generateTicketCode } from "@/lib/utils/ticketCode"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { sendTicketEmail } from "@/lib/email/sendTicketEmail"

export async function POST(req: Request) {

  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { eventId } = await req.json()

  const event = await prisma.event.findUnique({
    where: { id: eventId }
  })

  if (!event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 })
  }

  const user = await prisma.user.findUnique({
    where: { id: userId }
  })

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  const ticketCode = generateTicketCode()

  const ticket = await prisma.ticket.create({
    data: {
      eventId,
      userId,
      ticketCode
    }
  })

  await sendTicketEmail({
    email: user.email,
    eventTitle: event.title,
    ticketCode,
    startDate: event.startDate,
    location: event.location
  })

  return NextResponse.json(ticket)
}