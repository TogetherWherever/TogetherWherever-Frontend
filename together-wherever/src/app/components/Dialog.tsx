import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { Dispatch, SetStateAction } from 'react';
import { BaseButton } from "@/app/components/buttons/BaseButton";

interface DialogTxt {
  topic: string;
  desc: string;
};

interface DialogPropsInterface {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onConfirm: () => void;
  dialogTxt: DialogTxt;
};

export default function DialogBox({ isOpen, setIsOpen, onConfirm, dialogTxt }: DialogPropsInterface) {
  return (
    <>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        {/* Backdrop for dimming the background */}
        <div className="fixed inset-0 bg-black opacity-50 backdrop-blur-sm z-40" />

        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 z-50">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12 rounded-xl">
            <DialogTitle className="font-bold text-2xl"> {dialogTxt.topic} </DialogTitle>
            <Description> {dialogTxt.desc} </Description>
            <div className="flex justify-between gap-4">
              <BaseButton
                buttonTxt="Cancel"
                className="px-4 py-2 bg-red text-black rounded text-sm"
                onClick={() => setIsOpen(false)}
              />
              <BaseButton
                buttonTxt="Confirm"
                className="px-4 py-2 bg-asparagus-green text-white rounded text-sm"
                onClick={() => {
                  onConfirm();
                  setIsOpen(false);
                }}
              />
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};
