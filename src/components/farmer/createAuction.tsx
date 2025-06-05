/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchRetailers, createAuction } from "@/lib/api/farmer";

export default function CreateAuction() {
  const [retailers, setRetailers] = useState<any[]>([]);
  const [selectedRetailers, setSelectedRetailers] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const roleId = useSelector((state: any) => state.auth.roleId);
  const token = useSelector((state: any) => state.auth.token);
  const [formData, setFormData] = useState({
    farmer_id: roleId,
    title: "",
    start_time: "",
    end_time: "",
    min_bid_price: 0,
  });

  useEffect(() => {
    if (!token) return;
    fetchRetailers(token)
      .then(setRetailers)
      .catch((err) => console.error("Error fetching retailers:", err));
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRetailerSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = Array.from(e.target.selectedOptions, (option) =>
      parseInt(option.value)
    );
    setSelectedRetailers(options);
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  try {
    await createAuction(
      {
        ...formData,
        min_bid_price: parseFloat(formData.min_bid_price.toString()),
        retailer_ids: selectedRetailers,
      },
      token
    );
    alert("Auction Created Successfully!");
    // Optionally reset form here
  } catch (err) {
    console.error("Error creating auction:", err);
    alert("Failed to create auction");
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10 border border-green-300">
      <h2 className="text-3xl font-bold mb-6 text-green-900">Create Auction</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="title"
          placeholder="Auction Title"
          onChange={handleChange}
          className="w-full border border-green-400 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-black"
          required
        />
      <input
  type="datetime-local"
  name="start_time"
  onChange={handleChange}
  className="w-full border border-green-400 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-black [&::-webkit-calendar-picker-indicator]:bg-green-600 [&::-webkit-calendar-picker-indicator]:p-2 [&::-webkit-calendar-picker-indicator]:rounded"
  required
/>
        <input
  type="datetime-local"
  name="end_time"
  onChange={handleChange}
  className="w-full border border-green-400 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-black [&::-webkit-calendar-picker-indicator]:bg-green-600 [&::-webkit-calendar-picker-indicator]:p-2 [&::-webkit-calendar-picker-indicator]:rounded"
  required
/>
        <input
          type="number"
          step="0.01"
          name="min_bid_price"
          placeholder="Minimum Bid Price"
          onChange={handleChange}
          className="w-full border border-green-400 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-black"
          required
        />

        <div>
          <label className="block text-green-800 mb-2 font-semibold">
            Select Retailers
          </label>
          <select
            multiple
            onChange={handleRetailerSelect}
            className="w-full border border-green-400 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-black h-auto min-h-[120px]"
            required
          >
            {retailers.map((r: any) => (
              <option 
                key={r.retailer_id} 
                value={r.retailer_id}
                className="p-2 hover:bg-green-100 rounded"
              >
                {r.user?.name || `Retailer ${r.retailer_id}`}
              </option>
            ))}
          </select>
          <p className="text-sm text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple retailers</p>
        </div>

        <button
  type="submit"
  className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition disabled:opacity-50"
  disabled={isSubmitting}
>
  {isSubmitting ? "Creating..." : "Create Auction"}
</button>
      </form>
    </div>
  );
}