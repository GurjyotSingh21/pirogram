import { prisma } from "@/lib/prisma"

export async function getUserTickets(userId: string) {
  return await prisma.ticket.findMany({
    where: {
      userId
    },
    include: {
      event: true
    },
    orderBy: {
      purchaseDate: "desc"
    }
  })
}

export async function getUserEvents(userId: string) {
  return await prisma.event.findMany({
    where: {
      creatorId: userId
    },
    orderBy: {
      createdAt: "desc"
    }
  })
}