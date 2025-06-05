/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useSelector } from "react-redux";
import { connectSocket, disconnectSocket } from "@/socket/socket";

const AuctionDetailPage = () => {
  const params = useParams();
  const slug = params?.auctionSlug as string;
  const token = useSelector((state: any) => state.auth.token);
  const [auction, setAuction] = useState<any>(null);
  const [bids, setBids] = useState<any[]>([]);
  const socketRef = useRef<any>(null);
  const timerRef = useRef<any>(null);
  const [remainingTime, setRemainingTime] = useState<string>("00:00");

  const formatTime = (ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  useEffect(() => {
    const fetchAuctionDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/v1/auction/list/${slug}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const auctionData = res.data;
        setAuction(auctionData);

        // Setup countdown based on frontend time
        const startTime = new Date(auctionData.start_time).getTime();
        const endTime = new Date(auctionData.end_time).getTime();

        const updateRemainingTime = () => {
          const now = Date.now();

          if (now < startTime) {
            setRemainingTime("Auction not started");
            return;
          }

          const remainingMs = endTime - now;
          if (remainingMs <= 0) {
            setRemainingTime("00:00");
            clearInterval(timerRef.current);
            return;
          }

          setRemainingTime(formatTime(remainingMs));
        };

        updateRemainingTime(); // Initial update
        timerRef.current = setInterval(updateRemainingTime, 1000);

        // Socket connection
        const socket = connectSocket(auctionData.auction_id, token);
        socketRef.current = socket;

        socket.on("connect", () => {
          console.log("🟢 Connected to socket:", socket.id);
        });

        socket.on("disconnect", () => {
          console.log("🔴 Disconnected from socket");
        });

        socket.on("allBids", (data) => {
          console.log("📥 allBids received:", data);
          setBids(data);
        });
      } catch (err) {
        console.error("Failed to fetch auction details", err);
      }
    };

    if (slug && token) fetchAuctionDetails();

    return () => {
      clearInterval(timerRef.current);
      disconnectSocket();
      console.log("🔌 Socket & timer cleaned up");
    };
  }, [slug, token]);

  if (!auction)
    return (
      <p className="text-center mt-10 text-gray-600">
        Loading auction details...
      </p>
    );

  return (
    <div className="min-h-screen bg-green-50 px-6 py-10">
      <h2 className="text-3xl font-semibold text-green-700 mb-10">
        Auction Details
      </h2>
      <p className="text-xl font-bold text-green-700">Time Left: {remainingTime}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-10 text-gray-800 text-lg mb-10">
        <Detail label="Title" value={auction.title} />
        <Detail label="Slug" value={auction.slug} />
        <Detail label="Status" value={auction.status} />
        <Detail
          label="Start Time"
          value={new Date(auction.start_time).toLocaleString()}
        />
        <Detail
          label="End Time"
          value={new Date(auction.end_time).toLocaleString()}
        />
        <Detail label="Min Bid Price" value={`₹${auction.min_bid_price}`} />
        <Detail label="Invitations" value={auction.invitations.length} />
      </div>

      {/* 🧾 Bids Table */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-green-700 mb-4">Live Bids</h3>
        <table className="w-full bg-white shadow-md rounded-xl overflow-hidden">
          <thead className="bg-green-100 text-left">
            <tr>
              <th className="py-2 px-4">Retailer</th>
              <th className="py-2 px-4">Bid Amount</th>
              <th className="py-2 px-4">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {bids.length > 0 ? (
              bids.map((bid, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2 px-4">
                    {bid.retailer?.name || `Retailer #${index + 1}`}
                  </td>
                  <td className="py-2 px-4">₹{bid.bid_amount}</td>
                  <td className="py-2 px-4">{bid.quantity} kg</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-500">
                  No bids received yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Detail = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="flex flex-col">
    <span className="text-sm text-green-600 font-medium uppercase">
      {label}
    </span>
    <span className="text-base">{value}</span>
  </div>
);

export default AuctionDetailPage;
