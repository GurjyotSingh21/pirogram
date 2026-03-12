import { prisma } from "@/lib/prisma"

export async function getEvents() {
  try {
    const events = await prisma.event.findMany({
        include: {
            creator: true
        },
      orderBy: {
        createdAt: "desc"
      }
    })

    return events
  } catch (error) {
    console.log(error)
    return []
  }
}

export async function getEventById(eventId: string, userId?: string) {
  try {

    const event = await prisma.event.findUnique({
      where: {
        id: eventId
      },
      include: {
        creator: true,
        tickets: userId
        ? {
          where:{userId},
          select: {ticketCode: true}
        }
        : false
      }
    })

    return event

  } catch (error) {
    console.log(error)
  }
}