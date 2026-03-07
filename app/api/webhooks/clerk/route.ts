import { headers } from "next/headers"
import { Webhook } from "svix"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.text()

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
    evt = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    })
  } catch (err) {
    return new NextResponse("Invalid webhook", { status: 400 })
  }

  const eventType = evt.type

  if (eventType === "user.created") {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;

const email = email_addresses[0].email_address;
const firstName = first_name;
const lastName = last_name;
const imageUrl = image_url;

      await prisma.user.upsert({
  where: {
    id,
  },
  update: {
    email,
    firstName,
    lastName,
    imageUrl,
  },
  create: {
    id,
    email,
    firstName,
    lastName,
    imageUrl,
  },
});
  }

  return NextResponse.json({ success: true })
}