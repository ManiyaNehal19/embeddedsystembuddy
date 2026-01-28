"use client";
import React, { useState } from "react";

const Input = ({
  onSend,
  isLoading,
}: {
  onSend: (text: string) => void;
  isLoading: boolean;
}) => {
  const [userInput, setUserInput] = React.useState("");
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    onSend(userInput); 
    setUserInput("");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex items-center gap-2"
    >
      <input
        type="text"
        placeholder="Ask a question about Embedded Systems"
        className="p-4 w-full rounded-full text-white outline-none border border-transparent focus:border-[#4ade80] bg-gray-800"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        disabled={isLoading}
      />
    </form>
  );
};

export default Input;
