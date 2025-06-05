"use client";

import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Hero() {
  const router = useRouter();
  const { user, isLoading } = useUser();

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200 px-4">
      <div className="text-center max-w-2xl">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-green-800 mb-6"
        >
          Welcome to AgriMarket Exchange
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-gray-700 mb-8"
        >
          Connecting Farmers, Retailers, and Consumers through a unified platform for agricultural trade and transparency.
        </motion.p>

        {!isLoading && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {user ? (
              <Button
                onClick={() => router.push("/access")}
                className="text-lg px-8 py-4 rounded-2xl shadow-md hover:bg-green-700 transition"
              >
                Go to Dashboard
              </Button>
            ) : (
              <p className="text-md text-green-800 font-semibold">
                Sign up to access the dashboard.
              </p>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
