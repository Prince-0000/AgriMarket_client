/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardBody, CardFooter, Image } from "@heroui/react";
// import { Products } from "@/types/product"; // adjust path as needed
import { useRouter } from "next/navigation";
import Pic from "@/images/image.png"

export default function ProductCard({ list }: { list: any}) {
  console.log(list);
  const router = useRouter();
  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {list?.map((item:any, index:any) => (
        <Card key={index} isPressable shadow="sm" onPress={() => router.push(`consumer/products/${item.product_id}`)}>
          <CardBody className="overflow-visible p-0">
            <Image
              alt={item.title}
              className="w-full object-content h-[140px]"
              radius="lg"
              shadow="sm"
              src={Pic.src}
              width="100%"
            />
          </CardBody>
          <CardFooter className="text-white text-small justify-between">
            <b>{item.name}</b>
            <p className="text-default-500">${item.price_per_unit}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
