// socket.ts
"use client"
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = (auctionId: number, token: string): Socket => {
  if (!socket || !socket.connected) {
    socket = io("ws://localhost:4000", {
      query: { auctionId: String(auctionId) },
      extraHeaders: {
        token: `${token}`,
      },
    });
  }
  return socket;
};

export const getSocket = (): Socket | null => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
