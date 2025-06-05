/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useRef, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useSelector } from "react-redux";
import { connectSocket, disconnectSocket } from "@/socket/socket";

const AuctionDetailPage = () => {
  const params = useParams();
  const slug = params?.auctionSlug as string;
  const token = useSelector((state: any) => state.auth.token);
  const [auction, setAuction] = useState<any>(null);
  const [topBids, setTopBids] = useState<any[]>([]);
  const [bidAmount, setBidAmount] = useState("");
  const [quantity, setQuantity] = useState("");
  const [connected, setConnected] = useState(false);
  const socketRef = useRef<any>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [hasEnded, setHasEnded] = useState(false);

const calculateTimeLeft = (endTime: string) => {
  const diff = new Date(endTime).getTime() - new Date().getTime();
  if (diff <= 0) {
    setHasEnded(true);
    return "Auction ended";
  }

  setHasEnded(false);
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return `${hours}h ${minutes}m ${seconds}s`;
};


  useEffect(() => {
    const fetchAuctionDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/v1/auction/list/${slug}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAuction(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch auction", err);
      }
    };

    if (slug && token) fetchAuctionDetails();
  }, [slug, token]);

  useEffect(() => {
    if (!auction || !token) return;

    // Connect socket once auction and token are ready
    const socket = connectSocket(auction.auction_id, token);
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("🟢 Connected:", socket.id);
      setConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Disconnected");
      setConnected(false);
    });

    socket.on("topBids", (bids: any) => {
      console.log("📥 Top bids received:", bids);
      setTopBids(bids);
    });

    socket.on("error", (errMsg: string) => {
      console.error("🚫 Error received:", errMsg);
      setErrorMsg(errMsg);
      setTimeout(() => setErrorMsg(""), 2000);
    });
    if (!auction?.end_time) return;

  const updateTimer = () => {
    setTimeLeft(calculateTimeLeft(auction.end_time));
  };

  updateTimer(); // run once immediately
  const interval = setInterval(updateTimer, 1000);


    return () => {
      disconnectSocket();
      socketRef.current = null;
      setConnected(false);
      console.log("🔌 Socket disconnected");
      clearInterval(interval);
    };
  }, [auction, token]);

  const handlePlaceBid = () => {
    const socket = socketRef.current;
    if (!socket || !socket.connected) {
      setErrorMsg("Please connect to the auction first.");
      return;
    }

    socket.emit("placeBid", {
      bidAmount: parseFloat(bidAmount),
      quantity: parseFloat(quantity),
    });

    console.log("✅ Bid placed:", { bidAmount, quantity });
  };

  if (!auction)
    return (
      <p className="text-center mt-10 text-gray-600">
        Loading auction details...
      </p>
    );

  return (
    <div className="min-h-screen bg-green-50 px-6 py-10">
      <h2 className="text-3xl font-semibold text-green-700 mb-2">
  Auction Details
</h2>
{timeLeft ? (
  <p className="text-lg text-gray-700 mb-8">
    ⏳ Time left: <span className="font-semibold">{timeLeft}</span>
  </p>
) : (<p>
  Auction End</p>)}


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

      {/* 💸 Place Bid */}
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-xl">
        <h3 className="text-xl font-semibold mb-4 text-green-700">
          Place a Bid
        </h3>
        <div className="flex flex-col gap-4">
          <input
            type="number"
            placeholder="Bid Amount (₹)"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2"
          />
          <input
            type="number"
            placeholder="Quantity (kg)"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2"
          />
          <button
            onClick={handlePlaceBid}
            className={`px-4 py-2 rounded text-white ${
    hasEnded ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
  }`}
            disabled={hasEnded}
          >
            Submit Bid
          </button>
        </div>
      </div>

      {/* 📊 Top Bids */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-green-700 mb-4">
          Top 3 Bids
        </h3>
        <table className="w-full bg-white shadow-md rounded-xl overflow-hidden">
          <thead className="bg-green-100 text-left">
            <tr>
              <th className="py-2 px-4">Retailer</th>
              <th className="py-2 px-4">Bid Amount</th>
              <th className="py-2 px-4">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {topBids.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-500">
                  No bids yet.
                </td>
              </tr>
            ) : (
              topBids.map((bid, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2 px-4">
                    {bid.retailer?.name || "Retailer #" + (index + 1)}
                  </td>
                  <td className="py-2 px-4">₹{bid.bid_amount}</td>
                  <td className="py-2 px-4">{bid.quantity} kg</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {errorMsg && (
        <div className="mt-6 p-4 bg-red-100 text-red-700 border border-red-300 rounded-md">
          ⚠️ {errorMsg}
        </div>
      )}
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
