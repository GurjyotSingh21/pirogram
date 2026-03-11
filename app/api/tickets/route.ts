import { prisma } from "@/lib/prisma"
import { generateTicketCode } from "@/lib/utils/ticketCode"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST(req: Request) {

  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { eventId } = await req.json()

  const ticket = await prisma.ticket.create({
    data: {
      eventId,
      userId,
      ticketCode: generateTicketCode()
    }
  })

  return NextResponse.json(ticket)
}