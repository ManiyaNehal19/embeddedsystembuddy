import { NextRequest, NextResponse } from "next/server";
import connectionToDataBase from "@/lib/mongodb";
import Thread from "@/models/message";
import { getEmbeddedSystemsResponse } from "@/lib/langchain";
import { auth } from "@clerk/nextjs/server";
export const POST = async (req: NextRequest) => {
  try {
    await connectionToDataBase();

    const { userId } = await auth();

    console.log(userId)
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { threadId, userMessage } = await req.json();

    if (!threadId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const aiMessage = await getEmbeddedSystemsResponse(userMessage);
    

    await Thread.findOneAndUpdate(
      { thread_id: threadId },
      {
        $setOnInsert: {
          thread_id: threadId,
          thread_name: "New Chat",
          userId, 
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
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};

export const GET = async () => {
  try {
    await connectionToDataBase();
    const { userId } = await auth();
    console.log(userId, "Get function");


    
    const threads = await Thread.find({userId}, { thread_id: 1, thread_name: 1, }).sort({ updatedAt: -1 });
    console.log(threads, "Threads fetched");
    return NextResponse.json({ success: true, threads });
  } catch (err) {
    console.error("Failed to get threads:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });

  }
};