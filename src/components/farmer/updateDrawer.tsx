/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Input,
  Textarea,
} from "@heroui/react";
import { updateProduct } from "@/lib/api/farmer";
import { useSelector } from "react-redux";

interface Product {
  product_id: number;
  name: string;
  description: string;
  category: string;
  price_per_unit: number;
  quantity_available: number;
}

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  onProductUpdated: () => Promise<void>;
  product: Product;
}

export const UpdateDrawer = ({
  isOpen,
  onOpenChange,
  onClose,
  onProductUpdated,
  product,
}: Props) => {
  const token = useSelector((state:any)=>state.auth.token);
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setCategory(product.category);
      setPrice(product.price_per_unit.toString());
      setQuantity(product.quantity_available.toString());
    }
  }, [product]);

  const handleUpdateProduct = async () => {
    const updatedProduct: Partial<Product> = {
      name,
      description,
      category,
      price_per_unit: parseFloat(price),
      quantity_available: parseInt(quantity),
    };

    try {
      await updateProduct(product.product_id, updatedProduct, token);
      onClose();
      await onProductUpdated();
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  return (
    <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        <>
          <DrawerHeader className="flex flex-col gap-1">Update Product</DrawerHeader>
          <DrawerBody className="flex flex-col gap-4">
            <Input
              label="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product name"
              variant="bordered"
            />
            <Textarea
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description"
              variant="bordered"
            />
            <Input
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter product category"
              variant="bordered"
            />
            <Input
              label="Price Per Unit"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price per unit"
              type="number"
              variant="bordered"
            />
            <Input
              label="Quantity Available"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter quantity available"
              type="number"
              variant="bordered"
            />
          </DrawerBody>
          <DrawerFooter>
            <Button color="danger" variant="flat" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" onPress={handleUpdateProduct}>
              Update Product
            </Button>
          </DrawerFooter>
        </>
      </DrawerContent>
    </Drawer>
  );
};

export default UpdateDrawer;