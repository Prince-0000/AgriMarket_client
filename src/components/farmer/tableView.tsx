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
import UpdateDrawer from "./updateDrawer";
import { getFarmerProducts, deleteProduct } from "@/lib/api/farmer";
import { useSelector } from "react-redux";

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

const {
isOpen,
onOpen,
onOpenChange,
onClose
} = useDisclosure();

const {
isOpen: isUpdateOpen,
onOpen: onUpdateOpen,
onOpenChange: onUpdateOpenChange,
onClose: onUpdateClose
} = useDisclosure();

const token = useSelector((state: any) => state.auth.token);
const farmerId = useSelector((state: any) => state.auth.roleId);

useEffect(() => {
const fetchProducts = async () => {
if (token && farmerId) {
const res: any = await getFarmerProducts(token, farmerId);
setProducts(res);
}
};
fetchProducts();
}, [token, farmerId]);

const refetchProducts = useCallback(async () => {
const updated: any = await getFarmerProducts(token, farmerId);
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
        <p className="font-bold text-green-700">{cellValue}</p>
        <p className="text-sm text-gray-500">{product.description}</p>
      </div>
    );
  case "category":
    return <p className="capitalize text-green-800">{cellValue}</p>;
  case "price_per_unit":
    return <p className="text-green-800">${cellValue}</p>;
  case "quantity_available":
    return <p className="text-green-800">{cellValue}</p>;
  case "actions":
    return (
      <div className="flex items-center gap-3">
        <Tooltip content="View details">
          <span className="text-green-600 hover:text-green-800 cursor-pointer">
            <EyeIcon size={18} />
          </span>
        </Tooltip>
        <Tooltip content="Edit product">
          <span
            className="text-green-500 hover:text-green-700 cursor-pointer"
            onClick={() => handleEditClick(product)}
          >
            <EditIcon size={18} />
          </span>
        </Tooltip>
        <Tooltip color="danger" content="Delete product">
          <span
            className="text-red-500 hover:text-red-600 cursor-pointer"
            onClick={() => handleDeleteClick(product.product_id)}
          >
            <DeleteIcon size={18} />
          </span>
        </Tooltip>
      </div>
    );
  default:
    return <p className="text-green-800">{cellValue}</p>;
}
}, []);

return (
<div className="bg-white min-h-screen p-6 text-green-900">
<div className="flex justify-between items-center mb-6">
<h1 className="text-2xl font-semibold">Your Products</h1>
<Button className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700" onPress={onOpen}>
Add New Product
</Button>
</div>
  <div className="rounded-xl overflow-hidden shadow border border-green-200">
   <Table
  aria-label="Products table"
  className="!bg-white !text-green-900 !border-green-200"
>
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            className="bg-green-600 text-white font-semibold text-sm uppercase"
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody className="bg-white" items={products}>
        {(item: any) => (
          <TableRow
  key={item.product_id}
  className="!bg-white hover:!bg-green-50 transition-colors"
>
            {(columnKey) => (
              <TableCell className="!bg-white py-4 px-3 border-b border-green-200">
                {renderCell(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  </div>

  <AddUserDrawer
    isOpen={isOpen}
    onOpenChange={onOpenChange}
    onClose={onClose}
    onProductAdded={refetchProducts}
  />

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