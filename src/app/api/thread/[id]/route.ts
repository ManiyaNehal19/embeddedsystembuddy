import { NextRequest, NextResponse } from "next/server";
import connectionToDataBase from "@/lib/mongodb";
import Thread from "@/models/message";
import { auth } from "@clerk/nextjs/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectionToDataBase();

    const { userId } = await auth();
    console.log(userId, "Get function");

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    console.log("Fetching thread with ID:", id);

    const thread = await Thread.findOne({ thread_id: id, userId });

    if (!thread) {
      return NextResponse.json({ error: "Thread not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, messages: thread.messages });
  } catch (err) {
    console.error("Failed to get thread:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
