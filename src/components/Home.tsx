"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";



import Input from "@/components/Input";
import SideBar from "@/components/SideBar";
import { v4 as uuidv4 } from 'uuid';

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [threadId, setThreadId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  
const createNewThread = async () => {
  const newId = uuidv4(); 
  console.log(newId, "New Thread ID");
  setThreadId(newId);     
  setMessages([]);       
  try {
    await axios.post("/api/chat", {
      threadId: newId,
      userMessage: "", 
    });
  } catch (err) {
    console.error("Failed to create new thread:", err);
  }
};

  useEffect(() => {
    setThreadId(crypto.randomUUID());
  }, []);

  const handleSelectThread = async (id: string) => {
    setThreadId(id);
    setMessages([]); 

    try {
      const res = await axios.get(`/api/thread/${id}`); 
      if (res.data.success) {
        setMessages(res.data.messages);
      }
    } catch (err) {
      console.error("Failed to load thread messages:", err);
    }
  };

  const sendMessage = async (text: string) => {
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setIsLoading(true);

    try {
      const res = await axios.post("/api/chat", {
        threadId,
        userMessage: text,
      });

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res.data.aiMessage },
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-11/12 bg-[#121417]">
      <SideBar onSelectThread={handleSelectThread} onNewThread={createNewThread} />


      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[70%] p-3 rounded-lg ${
                msg.role === "user"
                  ? "ml-auto bg-[#4ade80] text-black"
                  : "mr-auto bg-gray-800 text-white"
              }`}
            >
              {msg.role === "assistant" ? (
                <ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={{
    code({ className, children, ...props }) {
      return (
        <code
          className={`block bg-black/40 text-green-300 p-3 rounded-md overflow-x-auto ${className ?? ""}`}
          {...props}
        >
          {children}
        </code>
      );
    },
  }}
>
  {msg.content}
</ReactMarkdown>

              ) : (
                msg.content
              )}
            </div>
          ))}

          {isLoading && (
            <div className="text-gray-400 text-sm">AI is typing…</div>
          )}
        </div>

        <div className="p-4">
          <Input onSend={sendMessage} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
