/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
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
import { addProduct } from "@/lib/api/farmer"; // adjust path as needed
import { useSelector } from "react-redux";


interface Product {
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
  onProductAdded: () => Promise<void>;
}

export const AddUserDrawer = ({
  isOpen,
  onOpenChange,
  onClose,
  onProductAdded,
}: Props) => {

  const token = useSelector((state:any)=>state.auth.token);
  const roleId = useSelector((state:any)=>state.auth.roleId);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleAddProduct = async () => {
    const product: Partial<Product> = {
      name,
      description,
      category,
      price_per_unit: parseFloat(price),
      quantity_available: parseInt(quantity),
    };

    try {
      await addProduct(roleId, product, token);
      onClose();
      await onProductAdded();
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  return (
    <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        <>
          <DrawerHeader className="flex flex-col gap-1">Add New Product</DrawerHeader>
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
            <Button color="primary" onPress={handleAddProduct}>
              Add Product
            </Button>
          </DrawerFooter>
        </>
      </DrawerContent>
    </Drawer>
  );
};

export default AddUserDrawer;
