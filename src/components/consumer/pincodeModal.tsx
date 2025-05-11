'use client';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@heroui/react";
import { useState } from "react";

export default function PincodeModal({
  isOpen,
  onOpenChange,
  onSubmit,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  onSubmit: (pincode: string) => void;
}) {
  const [pincode, setPincode] = useState("");

  return (
    <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Enter Your Pincode</ModalHeader>
            <ModalBody>
              <Input
                label="Pincode"
                placeholder="Enter your area pincode"
                variant="bordered"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button
                color="primary"
                onPress={() => {
                  onSubmit(pincode);
                  onClose();
                }}
              >
                Submit
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
