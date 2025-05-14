/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import ProductCard from '@/components/consumer/productCard';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useDisclosure } from "@heroui/react";
import PincodeModal from '@/components/consumer/pincodeModal';
import { setPincode } from '@/store/slices/userSlice';
import { Button } from '@heroui/react';

export interface Product {
  id: string;
  title: string;
  price: number;
  image: any;
}

export default function ProductPage() {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const pincode = useSelector((state: any) => state.user.pincode);
  const role = useSelector((state: any) => state.auth.role);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:4000/api/v1/products/pin/list?pincode=${pincode}`
        );
        setProducts(res.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    if (pincode) {
      fetchProducts();
    } else if (role === 'consumer' || role==='retailer') {
      onOpen();
    }
  }, [pincode, role, onOpen]);

  const handlePincodeSubmit = (pincode: string) => {
    if (pincode) {
      localStorage.setItem("consumer_pincode", pincode);
      dispatch(setPincode(pincode));
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Pincode Display */}
      {pincode && (
        <div className="mb-4 flex items-center gap-2">
          <span className="text-gray-600">
            Showing products for pincode: <strong>{pincode}</strong>
          </span>
          <Button 
            size="sm" 
            variant="light" 
            onPress={onOpen}
          >
            Change
          </Button>
        </div>
      )}

      {/* Products Section */}
      <div>
        <h1 className="text-2xl font-bold mb-4">
          {products.length > 0 ? 'Available Products' : 'No Products Available'}
        </h1>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : (
          <ProductCard list={products} />
        )}
      </div>

      {/* Pincode Modal */}
      <PincodeModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onSubmit={handlePincodeSubmit}
      />
    </div>
  );
}