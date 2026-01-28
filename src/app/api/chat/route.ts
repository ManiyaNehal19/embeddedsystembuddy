import connectionToDataBase from "@/lib/mongodb";
import Thread from "@/models/message";
import { NextRequest, NextResponse } from "next/server";
import { getEmbeddedSystemsResponse } from "@/lib/langchain";

export const POST = async (req: NextRequest) => {
  try {
    await  connectionToDataBase();

    const { threadId, userMessage } = await req.json();

    if (!threadId || !userMessage) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    const aiMessage = await getEmbeddedSystemsResponse(userMessage);

    // 🔹 upsert thread + append messages
    await Thread.findOneAndUpdate(
      { thread_id: threadId },
      {
        $setOnInsert: {
          thread_id: threadId,
          thread_name: "New Chat",
        },
        $push: {
          messages: {
            $each: [
              { role: "user", content: userMessage },
              { role: "assistant", content: aiMessage },
            ],
          },
        },
      },
      { upsert: true }
    );

    return NextResponse.json({
      success: true,
      aiMessage,
    });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
};
