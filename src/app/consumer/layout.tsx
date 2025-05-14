/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { ReactNode, useEffect } from 'react';
import { useDisclosure } from "@heroui/react";
import { useSelector, useDispatch } from 'react-redux';
import PincodeModal from '@/components/consumer/pincodeModal';
import { setPincode } from '@/store/slices/userSlice';

export default function ConsumerLayout({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
   const role = useSelector((state: any) => state.auth.role);
   const pincode = useSelector((state:any) => state.user.pincode);

  useEffect(() => {
    if (role === 'consumer' && !pincode) {
      onOpen();
    }
  }, [onOpen]);

  const handleSubmit = (pincode: string) => {
    if (pincode) {
      localStorage.setItem("consumer_pincode", pincode);
      dispatch(setPincode(pincode))
    }
  };

  return (
    <>
      <PincodeModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onSubmit={handleSubmit}
      />
      {children}
    </>
  );
}
