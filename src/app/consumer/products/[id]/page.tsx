/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { FaWhatsapp, FaPhone, FaStore } from "react-icons/fa";
import Pic from "@/images/image.png";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:4000/api/v1/products/list/${id}`);
        console.log(res);
        setProduct(res.data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError("Failed to load product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) return <div className="p-6 text-center">Loading product details...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!product) return <div className="p-6">Product not found</div>;

  // Prepare WhatsApp message
  const whatsappMessage = `Hi, I'm interested in your product "${product.name}" (₹${product.price_per_unit}). Is it still available?`;
  const encodedMessage = encodeURIComponent(whatsappMessage);
  const whatsappUrl = `https://wa.me/${product.farmer.phone}?text=${encodedMessage}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg aspect-square flex items-center justify-center">
          <img
            src={product?.image_url || Pic.src}
            alt={product?.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              {product?.category}
            </span>
            <h1 className="mt-3 text-4xl font-bold text-gray-900">{product?.name}</h1>
            <p className="mt-4 text-gray-600 text-lg leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-gray-900">
                ₹{product?.price_per_unit}
              </span>
              <span className="text-sm text-gray-500">per unit</span>
            </div>

            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${product?.quantity_available > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-sm font-medium">
                {product?.quantity_available > 0 
                  ? `${product?.quantity_available} available` 
                  : 'Out of stock'}
              </span>
            </div>
          </div>

          {/* Farmer Details with Contact Options */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Farmer Details</h3>
            <div className="mt-4 flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                  <FaStore className="w-5 h-5" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {product?.farmer.farm_name}
                </p>
                <p className="text-sm text-gray-500">
                  {product.farmer.location}
                </p>
              </div>
            </div>

            {/* Contact Options */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                <FaWhatsapp className="w-5 h-5" />
                WhatsApp
              </a>
              <a
                href={`tel:${product.farmer.phone_number}`}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                <FaPhone href="tel:+918607756200" className="w-5 h-5" />
                Call Now
              </a>
            </div>
          </div>

          <button
            className="w-full px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            disabled={product?.quantity_available <= 0}
          >
            {product?.quantity_available > 0 ? 'Add to Cart' : 'Notify When Available'}
          </button>
        </div>
      </div>
    </div>
  );
}