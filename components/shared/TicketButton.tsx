"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function TicketButton({ eventId }: { eventId: string }) {

  const router = useRouter()

  async function handlePurchase() {

    const res = await fetch("/api/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        eventId
      })
    })

    const ticket = await res.json()

    router.push(`/tickets/${ticket.ticketCode}`)
  }

  return (
    <Button onClick={handlePurchase}>
      Get Ticket
    </Button>
  )
}