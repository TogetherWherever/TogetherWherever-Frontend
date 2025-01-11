'use client';

import { Button } from '@headlessui/react';
import Image from "next/image"; 
import clsx from 'clsx';

interface BaseButtonPropsInterface {
  buttonTxt?: string;
  leftIcon?: string;
  rightIcon?: string;
  leftIconSize?: number;
  rightIconSize?: number;
  color?: string;
  className?: string;   
  onClick?: () => void; 
};

export const BaseButton = ({
  buttonTxt="Button Text", 
  leftIcon, 
  rightIcon, 
  leftIconSize=20,
  rightIconSize=20,
  color="moonstone-blue", 
  className,
  onClick: handleClick
}: BaseButtonPropsInterface) => {
  const buttonProperties = clsx(
    'flex items-center rounded-3xl py-3 px-5 text-xl text-white gap-1', 
    `bg-${color}`,
    className,
    leftIcon || rightIcon ? "justify-between" : "justify-center"
  );
  return (
    <div>
      <Button className={buttonProperties} onClick={handleClick}>
        {leftIcon && (
          <Image
            src={leftIcon}
            alt="Left Icon"
            width={leftIconSize}
            height={leftIconSize}
          />
        )}
        {buttonTxt}
        {rightIcon && (
          <Image
            src={rightIcon}
            alt="Left Icon"
            width={rightIconSize}
            height={rightIconSize}
          />
        )}
      </Button>
    </div>
  );
};