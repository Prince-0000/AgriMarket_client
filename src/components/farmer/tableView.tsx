/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Button,
  useDisclosure,
} from "@heroui/react";
import { DeleteIcon, EditIcon, EyeIcon } from "lucide-react";
import { Product } from "@/types/product";
import AddUserDrawer from "./tableDrawer";
import { getFarmerProducts, deleteProduct } from "@/lib/api/farmer";
import { useSelector } from "react-redux";
import UpdateDrawer from "./updateDrawer";

interface Props {
  initialProducts: Product[];
}

const columns = [
  { name: "PRODUCT NAME", uid: "name" },
  { name: "CATEGORY", uid: "category" },
  { name: "PRICE PER UNIT", uid: "price_per_unit" },
  { name: "QUANTITY AVAILABLE", uid: "quantity_available" },
  { name: "ACTIONS", uid: "actions" },
]; 

export default function TablePage() {

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { 
    isOpen: isUpdateOpen, 
    onOpen: onUpdateOpen, 
    onOpenChange: onUpdateOpenChange, 
    onClose: onUpdateClose 
  } = useDisclosure();
  const token = useSelector((state:any)=>state.auth.token);
  const farmerId = useSelector((state:any)=>state.auth.roleId);


 useEffect(() => {
  const fetch = async () => {
    if (token && farmerId) {
      const res: any = await getFarmerProducts(token, farmerId);
      setProducts(res);
    }
  };
  fetch();
}, [token, farmerId]);

  const refetchProducts = useCallback(async () => {
    const updated:any = await getFarmerProducts(token, farmerId);
    setProducts(updated);
  }, [token, farmerId]);

  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    onUpdateOpen();
  };

  const handleDeleteClick = async (productId: number) => {
    try {
      await deleteProduct(productId, token);
      await refetchProducts();
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const renderCell = useCallback((product: Product, columnKey: string) => {
    const cellValue = product[columnKey as keyof Product];

    switch (columnKey) {
      case "name":
        return (
          <div>
            <p className="font-bold">{cellValue}</p>
            <p className="text-sm text-default-400">{product.description}</p>
          </div>
        );
      case "category":
        return <p className="capitalize">{cellValue}</p>;
      case "price_per_unit":
        return <p>${cellValue}</p>;
      case "quantity_available":
        return <p>{cellValue}</p>;
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="View details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit product">
              <span 
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => handleEditClick(product)}
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete product">
              <span 
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => handleDeleteClick(product.product_id)}
              >
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div className="bg-black text-white">
      <div className="flex justify-end">
        <Button color="primary" onPress={onOpen}>
          Add New Product
        </Button>
      </div>

      <Table aria-label="Products table" className="bg-black text-white">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={products}>
          {(item:any) => (
            <TableRow key={item.product_id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
      
      {/* Add Product Drawer */}
      <AddUserDrawer 
        isOpen={isOpen} 
        onOpenChange={onOpenChange} 
        onClose={onClose} 
        onProductAdded={refetchProducts}
      />
      
      {/* Update Product Drawer */}
      {selectedProduct && (
        <UpdateDrawer 
          isOpen={isUpdateOpen} 
          onOpenChange={onUpdateOpenChange} 
          onClose={onUpdateClose} 
          onProductUpdated={refetchProducts}
          product={selectedProduct}
        />
      )}
    </div>
  );
}