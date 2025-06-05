/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Spinner } from "@heroui/react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function AuctionList() {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state:any)=>state.auth.token);

  const fetchAuctions = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/auction/list", {
         headers:{
            Authorization: `Bearer ${token}`
         }
      });
      setAuctions(response.data.auctions || []);
    } catch (error) {
      console.error("Error fetching auctions", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuctions();
  }, []);

  const formatDate = (date:any) => new Date(date).toLocaleString();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Auction List</h1>
      {loading ? (
        <div className="flex justify-center">
          <Spinner label="Loading auctions..." />
        </div>
      ) : (
        <Table
          aria-label="Auction Table"
          isStriped
          classNames={{
            wrapper: "bg-white shadow-md rounded-lg",
          }}
        >
          <TableHeader>
            <TableColumn>Title</TableColumn>
            <TableColumn>Slug</TableColumn>
            <TableColumn>Start Time</TableColumn>
            <TableColumn>End Time</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn>Min Bid</TableColumn>
            <TableColumn>Invitations</TableColumn>
          </TableHeader>
          <TableBody emptyContent="No auctions found.">
            {auctions.map((auction:any) => (
              <TableRow key={auction.auction_id}>
                <TableCell>{auction.title}</TableCell>
                <TableCell>{auction.slug}</TableCell>
                <TableCell>{formatDate(auction.start_time)}</TableCell>
                <TableCell>{formatDate(auction.end_time)}</TableCell>
                <TableCell>{auction.status}</TableCell>
                <TableCell>{auction.min_bid_price}</TableCell>
                <TableCell>{auction.invitations?.length || 0}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
