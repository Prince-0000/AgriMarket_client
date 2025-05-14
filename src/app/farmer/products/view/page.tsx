/* eslint-disable @typescript-eslint/no-explicit-any */
// app/farmer/products/page.tsx
// import { getFarmerProducts } from "@/lib/api/farmer";
// import { getAuth } from "@/app/hooks/useAuth";
import TablePage from "@/components/farmer/tableView";

const FarmerProductPage = async () => {
  // const { token, role_id }: any = await getAuth();
  // const products = await getFarmerProducts(token, role_id);

  return <TablePage />;
};

export default FarmerProductPage;

