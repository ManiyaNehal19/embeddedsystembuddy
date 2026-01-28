"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import Input from "@/components/Input";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [threadId, setThreadId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setThreadId(crypto.randomUUID());
  }, []);

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
    <div className="flex flex-col h-11/12  bg-[#121417]">
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
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={materialDark}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
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
  );
}
