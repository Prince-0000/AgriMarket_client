import AuctionList from "@/components/farmer/auctionList";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuctionList />
    </Suspense>
  );
};

export default page;
