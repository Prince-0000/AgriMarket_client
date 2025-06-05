/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import ProductDetailComponent from "@/components/consumer/productDetail";
import { useSelector } from "react-redux";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = useSelector((state:any)=>state.auth.token);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:4000/api/v1/products/list/${id}`, {
         headers:{
            Authorization: `Bearer ${token}`
         }
      });
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

  return (
    <ProductDetailComponent 
      product={product}
      loading={loading}
      error={error}
    />
  );
}