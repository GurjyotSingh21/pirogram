"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function TicketButton({ eventId }: { eventId: string }) {

  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handlePurchase() {

    setLoading(true)

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
    <Button
      onClick={handlePurchase}
      disabled={loading}
      className="flex items-center gap-2"
    >

      {loading ? (
        <>
          <img
            src="/assets/icons/spinner.svg"
            alt="loading"
            className="h-5 w-5 animate-spin"
          />
          Purchasing...
        </>
      ) : (
        "Get Ticket"
      )}

    </Button>
  )
}