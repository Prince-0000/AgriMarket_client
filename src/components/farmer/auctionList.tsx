/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AuctionListPage = () => {
  const [auctions, setAuctions] = useState([]);
  const farmerId = useSelector((state: any) => state.auth?.roleId);
  const token = useSelector((state: any) => state.auth?.token);
  const router = useRouter();

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/v1/auction/list", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAuctions(res.data.auctions || []);
      } catch (err) {
        console.error("Failed to fetch auctions", err);
      }
    };

    if (farmerId) fetchAuctions();
  }, [farmerId]);

  const handleRowClick = (slug: string) => {
    router.push(`/farmer/auctions/list/${slug}`);
  };

  return (
    <div style={{ backgroundColor: '#e8f5e9', minHeight: '100vh', padding: '2rem' }}>
      <h2 style={{ color: '#2e7d32', marginBottom: '1rem' }}>Your Auctions</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          <thead style={{ backgroundColor: '#c8e6c9', color: '#1b5e20' }}>
            <tr>
              <th style={thStyle}>Title</th>
              <th style={thStyle}>Start Time</th>
              <th style={thStyle}>End Time</th>
              <th style={thStyle}>Min Bid Price (₹)</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {auctions.map((auction: any) => (
              <tr
                key={auction.auction_id}
                style={{ ...tdRowStyle, cursor: 'pointer' }}
                onClick={() => handleRowClick(auction.slug)}
              >
                <td style={tdStyle}>{auction.title}</td>
                <td style={tdStyle}>{new Date(auction.start_time).toLocaleString()}</td>
                <td style={tdStyle}>{new Date(auction.end_time).toLocaleString()}</td>
                <td style={tdStyle}>{auction.min_bid_price}</td>
                <td style={tdStyle}>{auction.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const thStyle = {
  padding: '12px',
  borderBottom: '1px solid #a5d6a7',
  fontWeight: 'bold'
};

const tdStyle = {
  padding: '12px',
  borderBottom: '1px solid #e0e0e0'
};

const tdRowStyle = {
  textAlign: 'center',
  transition: 'background 0.2s',
  userSelect: 'none',
  ':hover': {
    backgroundColor: '#f1f8e9'
  }
};

export default AuctionListPage;
