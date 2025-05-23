/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { setCookie } from "cookies-next";
// import { useDispatch } from 'react-redux'
// import { setAuthData } from '@/store/slices/authSlice'

interface ProfileData {
  farm_name: string;
  location: string;
  pincode: string;
  business_name: string;
  preferred_category: string;
  phone: string;
}

type UserRole = "farmer" | "retailer" | "consumer";

interface Props {
  token: string;
}

export default function SetupProfileClient({ token }: Props) {
  // const dispatch = useDispatch()
  const [role, setRole] = useState<UserRole>("farmer");
  const [profileData, setProfileData] = useState<ProfileData>({
    farm_name: "",
    location: "",
    pincode: "",
    business_name: "",
    preferred_category: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // useEffect(() => {
  //   if (token) {
  //     dispatch(setAuthData({ token, role: '' })) // role will be set on submission
  //   }
  // }, [token, dispatch])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!token) throw new Error("Authentication token not found");

      let profilePayload: Record<string, string> = {};

      switch (role) {
        case "farmer":
          if (
            !profileData.farm_name ||
            !profileData.location ||
            !profileData.pincode
          )
            throw new Error("Farm name, location, and pincode are required");
          profilePayload = {
            farm_name: profileData.farm_name,
            location: profileData.location,
            pincode: profileData.pincode,
            phone: profileData.phone,
          };
          break;
        case "retailer":
          if (!profileData.business_name)
            throw new Error("Business name and license number are required");
          profilePayload = {
            business_name: profileData.business_name,
          };
          break;
        case "consumer":
          if (!profileData.preferred_category)
            throw new Error("Preferred category is required");
          profilePayload = {
            preferred_category: profileData.preferred_category,
          };
          break;
      }

const res = await fetch("http://localhost:4000/api/v1/profile/setup", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    role,
    profileData: profilePayload,
  }),
});

if (!res.ok) {
  const errorData = await res.json();
  throw new Error(errorData.message || "Profile setup failed");
}

const responseData = await res.json();

// Save role in cookie
setCookie("user_role", responseData.data.user.role, {
  path: "/",
  maxAge: 60 * 60 * 24, // 1 day
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
});

// Extract role-specific ID
const roleId =
  responseData.data.farmer_id ||
  responseData.data.consumer_id ||
  responseData.data.retailer_id ||
  null;

if (roleId) {
  setCookie("role_id", roleId.toString(), {
    path: "/",
    maxAge: 60 * 60 * 24,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
}

// Redirect based on role
window.location.href = `/${responseData.data.user.role}`;

    } catch (err: any) {
      setError(err.message || "An error occurred during profile setup");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="darkMode min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-xl rounded-xl space-y-6 w-full max-w-lg"
      >
        <h2 className="text-2xl font-semibold text-center">
          Complete Your Profile
        </h2>

        <div>
          <label className="block font-medium mb-1">Select Role</label>
          <select
            className="w-full border rounded-lg px-4 py-2"
            value={role}
            onChange={(e) => setRole(e.target.value as UserRole)}
          >
            <option value="farmer">Farmer</option>
            <option value="retailer">Retailer</option>
            <option value="consumer">Consumer</option>
          </select>
        </div>

        {role === "farmer" && (
          <>
            <Input
              label="Farm Name"
              name="farm_name"
              value={profileData.farm_name}
              onChange={(e) =>
                setProfileData({ ...profileData, farm_name: e.target.value })
              }
            />
            <Input
              label="Location"
              name="location"
              value={profileData.location}
              onChange={(e) =>
                setProfileData({ ...profileData, location: e.target.value })
              }
            />
            <Input
              label="Pincode"
              name="pincode"
              value={profileData.pincode}
              onChange={(e) =>
                setProfileData({ ...profileData, pincode: e.target.value })
              }
            />
            <Input
              label="Phone"
              name="phone"
              value={profileData.phone}
              onChange={(e) =>
                setProfileData({ ...profileData, phone: e.target.value })
              }
            />
          </>
        )}

        {role === "retailer" && (
          <>
            <Input
              label="Business Name"
              name="business_name"
              value={profileData.business_name}
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  business_name: e.target.value,
                })
              }
            />
          </>
        )}

        {role === "consumer" && (
          <div>
            <label className="block font-medium mb-1">Preferred Category</label>
            <select
              className="w-full border px-4 py-2 rounded-lg"
              value={profileData.preferred_category}
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  preferred_category: e.target.value,
                })
              }
            >
              <option value="">Select Category</option>
              <option value="organic">Organic</option>
              <option value="conventional">Conventional</option>
            </select>
          </div>
        )}

        {error && <p className="text-red-600 text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

function Input({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <input
        name={name}
        className="w-full border px-4 py-2 rounded-lg"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
