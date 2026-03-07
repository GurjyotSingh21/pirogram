import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    //Get Clerk user
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    //Get event data from request
    const body = await req.json();

    const {
      title,
      description,
      date,
      location,
      price,
      category,
      imageUrl,
    } = body;

    //Save event to database
    const event = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date),
        location,
        price,
        category,
        imageUrl,
        creatorId: userId,
      },
    });

    return NextResponse.json(event);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}