"use client"
import { useState, useEffect } from "react";
import axios from "axios";
interface SideBarProps {
  onSelectThread: (id: string) => void;
  onNewThread: () => void; // new prop
}

const SideBar: React.FC<SideBarProps> = ({ onSelectThread, onNewThread }) => {
  const [threads, setThreads] = useState<{ thread_id: string; thread_name: string }[]>([]);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const res = await axios.get("/api/chat");
        if (res.data.success) setThreads(res.data.threads);
      } catch (err) {
        console.error(err);
      }
    };
    fetchThreads();
  }, []);

  return (
    <div className="w-60 bg-gray-900 p-4 flex flex-col gap-3">
      <button
        onClick={onNewThread}
        className="bg-green-600 hover:bg-green-500 text-white px-3 py-2 rounded"
      >
        + New Thread
      </button>

      <div className="flex flex-col gap-2 mt-3 overflow-y-auto">
        {threads.map((thread) => (
          <button
            key={thread.thread_id}
            onClick={() => onSelectThread(thread.thread_id)}
            className="text-left bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded"
          >
            {thread.thread_name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
