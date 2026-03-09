export const dynamic = "force-dynamic"

import { headers } from "next/headers"
import { Webhook } from "svix"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {

  const payload = await req.text()

  const headerPayload = await headers()

  const svixId = headerPayload.get("svix-id")
  const svixTimestamp = headerPayload.get("svix-timestamp")
  const svixSignature = headerPayload.get("svix-signature")

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new NextResponse("Missing headers", { status: 400 })
  }

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!)

  let evt: any

  try {
    evt = wh.verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    })
  } catch (err) {
    return new NextResponse("Invalid webhook", { status: 400 })
  }

  if (evt.type === "user.created" || evt.type === "user.updated") {

    const { id, email_addresses, first_name, last_name, image_url } = evt.data

    const email = email_addresses?.[0]?.email_address ?? ""

    await prisma.user.upsert({
      where: { id },
      update: {
        email,
        firstName: first_name,
        lastName: last_name,
        imageUrl: image_url,
      },
      create: {
        id,
        email,
        firstName: first_name,
        lastName: last_name,
        imageUrl: image_url,
      },
    })
  }

  return NextResponse.json({ success: true })
}