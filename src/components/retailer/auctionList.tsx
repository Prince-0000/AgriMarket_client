/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

interface Auction {
  auction_id: number;
  title: string;
  slug: string;
  start_time: string;
  end_time: string;
  min_bid_price: string;
  status: string;
}

export default function RetailerAuctionListPage() {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const retailerId = useSelector((state:any)=>state.auth.roleId);
  const token = useSelector((state:any)=>state.auth.token);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/auction/retailer/list?retailer_id=${retailerId}`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        setAuctions(response.data.auctions || []);
      } catch (err) {
        setError('Failed to fetch auctions');
      } finally {
        setLoading(false);
      }
    };

    fetchAuctions();
  }, []);

  const handleRowClick = (slug: string) => {
    router.push(`/retailer/auctions/${slug}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Retailer Auctions</h1>

      {loading && <p className="text-gray-700">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-green-100 text-left text-green-800">
              <tr>
                <th className="px-6 py-3 text-sm font-medium">Title</th>
                <th className="px-6 py-3 text-sm font-medium">Start Time</th>
                <th className="px-6 py-3 text-sm font-medium">End Time</th>
                <th className="px-6 py-3 text-sm font-medium">Min Bid (₹)</th>
                <th className="px-6 py-3 text-sm font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              {auctions.map((auction) => (
                <tr
                  key={auction.auction_id}
                  onClick={() => handleRowClick(auction.slug)}
                  className="hover:bg-gray-100 cursor-pointer transition duration-200"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">{auction.title}</td>
                  <td className="px-6 py-4 text-gray-700">{new Date(auction.start_time).toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-700">{new Date(auction.end_time).toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-700">₹{auction.min_bid_price}</td>
                  <td className={`px-6 py-4 font-semibold ${auction.status === 'open' ? 'text-green-600' : 'text-red-500'}`}>
                    {auction.status}
                  </td>
                </tr>
              ))}
              {auctions.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    No auctions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
