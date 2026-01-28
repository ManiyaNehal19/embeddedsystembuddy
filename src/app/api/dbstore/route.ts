import connectionToDataBase from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Thread from "@/models/message";

export const POST = async (req: Request) => {
  try {
    await connectionToDataBase();

    const {
      threadId,
      threadName,
      userMessage,
      aiMessage,
    } = await req.json();

    if (!threadId || !userMessage) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const messagesToInsert = [
      { role: "user", content: userMessage },
    ];

    if (aiMessage) {
      messagesToInsert.push({
        role: "assistant",
        content: aiMessage,
      });
    }

    const thread = await Thread.findOneAndUpdate(
      { thread_id: threadId },
      {
        $setOnInsert: {
          thread_id: threadId,
          thread_name: threadName || "New Thread",
        },
        $push: {
          messages: { $each: messagesToInsert },
        },
      },
      {
        upsert: true,
        new: true,
      }
    );

    return NextResponse.json({
      success: true,
      threadId: thread.thread_id,
    });
  } catch (error) {
    console.error("DB error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
