/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product } from "@/types/product";

export const getFarmerProducts = async (token:string | null, role_id:string | null): Promise<Product[]> => {
  
  if (!token || !role_id) {
    throw new Error("Missing token or role_id");
  }
  console.log("in api",token, role_id);
  const res = await fetch(`http://localhost:4000/api/v1/farmer/products/${role_id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

export const addProduct = async (farmerId: number, product: Partial<Product>,token:string | null) => {
  console.log("in farmer", farmerId);
  const res = await fetch(`http://localhost:4000/api/v1/farmer/add/${farmerId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Failed to add product");
  return res.json();
};

// updateProduct.ts
export const updateProduct = async (productId: number, product: Partial<Product>, token: string | null) => {
  const res = await fetch(`http://localhost:4000/api/v1/farmer/product/${productId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Failed to update product");
  return res.json();
};

// deleteProduct.ts
export const deleteProduct = async (productId: number, token: string | null) => {
  const res = await fetch(`http://localhost:4000/api/v1/farmer/product/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to delete product");
  return res.json();
};

