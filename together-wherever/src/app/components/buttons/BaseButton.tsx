'use client';

import { Button } from '@headlessui/react';
import clsx from 'clsx';

interface BaseButtonPropsInterface {
    buttonTxt?: string;
    leftIcon?: React.ComponentType<{ className?: string }>;
    rightIcon?: React.ComponentType<{ className?: string }>;
    leftIconCustomization?: string;
    rightIconCustomization?: string;
    color?: string;
    className?: string;
    onClick?: (event?: any) => void;
    disabled?: boolean;
};

export const BaseButton = ({
    buttonTxt = "Button Text",
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    leftIconCustomization,
    rightIconCustomization,
    color = "moonstone-blue",
    className,
    disabled,
    onClick: handleClick
}: BaseButtonPropsInterface) => {
    const buttonProperties = clsx(
        'flex items-center rounded-3xl py-3 px-5 text-xl text-white gap-1',
        `bg-${color}`,
        className
    );
    return (
        <div>
            <Button className={buttonProperties} onClick={handleClick} disabled={disabled}>
                {LeftIcon && <LeftIcon className={leftIconCustomization} />}
                {buttonTxt}
                {RightIcon && <RightIcon className={rightIconCustomization} />}
            </Button>
        </div>
    );
};