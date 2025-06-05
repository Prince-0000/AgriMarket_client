'use client';

import { useEffect, useState } from "react";
import { connectSocket, disconnectSocket, getSocket } from "@/socket/socket";

export default function SocketTest() {
  const [messages, setMessages] = useState<string[]>([]);
  const auctionId = 7;

  useEffect(() => {
    // Connect when component mounts
    const socket = connectSocket(auctionId);

    socket.on("receive", (msg: string) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receive");
      disconnectSocket(); // Clean disconnection
    };
  }, []);

  const sendMessage = () => {
    const socket = getSocket();
    if (socket?.connected) {
      socket.emit("send", `Message from Auction ${auctionId}`);
    }
  };

  return (
    <div className="p-6">
      <button onClick={sendMessage} className="bg-blue-600 text-white px-4 py-2 rounded">
        Send Message
      </button>

      <ul className="mt-4">
        {messages.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}
