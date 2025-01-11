'use client';

import { BaseButton } from "@/app/components/buttons/BaseButton";

export default function ExampleButton () {
  const handleClick = () => {
    alert("Click!");
  };

  return (
    <div className="flex justify-between items-center">
      <BaseButton 
        buttonTxt="New Trip" 
        leftIcon="/plus-icon.svg"
        onClick={handleClick}
      />
      <BaseButton 
        buttonTxt="Start Planning" 
        className="!px-8"
        onClick={handleClick}
      />
      <BaseButton 
        buttonTxt="Share" 
        color="" 
        className="border !border-4 border-earth-yellow !text-earth-yellow !px-5 py-2 !gap-3"
        leftIcon="/share-icon.svg"  
        leftIconSize={25}
        onClick={handleClick}
      />
      <BaseButton 
        buttonTxt="Vote" 
        className="!py-2 !rounded-2xl"
        onClick={handleClick}
      />
    </div>
  );
};