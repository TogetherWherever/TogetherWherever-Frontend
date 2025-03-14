'use client';

import { useState, useEffect, SetStateAction } from 'react';
import { Input } from '@headlessui/react';
import PlaceSearchBox from "@/app/components/PlaceSearchBox";
import DateRangeInput from '@/app/components/DateRangeInput';
import Image from "next/image"; 
import { TrashIcon } from "@heroicons/react/24/solid";
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { BaseButton } from "@/app/components/buttons/BaseButton";
import { useCreateNewTrips } from "@/app/hooks/useCreateNewTrip";
import { useRouter } from "next/navigation";
import DialogBox from "@/app/components/Dialog";

const mockUsers = [
    {
        userId: '01',
        name: 'Christopher',
        profileImage: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
    },
    {
        userId: '02',
        name: 'Bob',
        profileImage: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
    },
    {
        userId: '03',
        name: 'Susan',
        profileImage: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
    },
    {
        userId: '04',
        name: 'Richard',
        profileImage: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
    }
];

const dialogTxt = {
    topic: "Create New Trip",
    desc: "Please confirm that you want to create a new trip."
};

export default function CreateNewTrip() {
    const {
        tripName,
        tripNameLength,
        companionName,
        range,
        setRange,
        handleChangeTripName,
        handleChangeCompanions,
        handleSelectCompanion,
        fetchPlaceDetails,
        handleClickStartPlanning,
        companionIds,
        handleRemoveCompanion
    } = useCreateNewTrips();

    const router = useRouter();
    let [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        // Check if token exists in localStorage
        const token = localStorage.getItem('token');
        
        if (token) {
        } else {
            router.push('/signin'); // Redirect to login page
        }
    }, [router]);

    const [usersData] = useState<Array<{ userId: string; name: string; profileImage: string; }>>(mockUsers);

    const filteredResults = usersData.filter((item) =>
        item.name.toLowerCase().includes(companionName.toLowerCase())
    );
  
    return (
        <div className="flex flex-col items-center justify-center gap-4 p-12">
            <div className="flex justify-center font-bold text-4xl">
                Plan a Trip
            </div>
            <div className="flex w-[1100px]">
                <form onSubmit={handleClickStartPlanning} className="flex flex-col w-full gap-2">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="trip-name" className="text-xl font-bold text-black">
                            Trip Name
                        </label>
                        <Input
                            id="trip-name"
                            type="text"
                            value={tripName}
                            onChange={handleChangeTripName}
                            placeholder="e.g., Summer in Phuket w/ my gang"
                            className={ "mt-1 block w-full h-[50px] rounded-xl border-2 border-hurricane bg-transparent py-1.5 px-3 focus:outline-none focus:ring-0" }
                        /> 
                        <label className='flex justify-end text-base text-hurricane'> {tripNameLength}/50 max characters </label>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="trip-name" className="text-xl font-bold text-black">
                            Where to?
                        </label>
                        <PlaceSearchBox onSelect={fetchPlaceDetails} />
                    </div>
                    <div className="flex w-full mt-4 gap-4">
                        <div className="flex flex-col gap-2 w-1/2">
                            <label htmlFor="trip-name" className="text-xl font-bold text-black">
                                Dates
                            </label>
                            <div className="w-full">
                                <DateRangeInput range={range} setRange={setRange}/>
                            </div>
                        </div>
                        <div className="flex flex-col w-1/2 h-full">                            
                            <label htmlFor="trip-name" className="text-xl font-bold text-black">
                                Companion
                            </label>
                            <div className="flex flex-col flex-grow">
                            <div className="mt-1">
                                <label className="text-base">Invite companions</label>
                                <Input
                                    id="companions"
                                    type="text"
                                    value={companionName}
                                    onChange={handleChangeCompanions}
                                    placeholder="Enter username"
                                    className="mt-1 block w-full h-[50px] rounded-xl border-2 border-hurricane bg-transparent py-1.5 px-3 focus:outline-none focus:ring-0"
                                />
                                {filteredResults.length > 0 && companionName && (
                                    <div className="absolute mt-2 w-[545px] bg-white border border-gray-300 rounded-xl shadow-md z-10">
                                        <ul className="divide-y divide-gray-200">
                                            {filteredResults.map((item: { userId: string; name: string }) => (
                                                <li
                                                    key={item.userId}
                                                    onClick={() => handleSelectCompanion(item)}
                                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-lg transition duration-200"
                                                >
                                                    {item.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                    {companionIds.length > 0 && (
                                        <div className="flex items-center mt-2 gap-6">
                                            {usersData
                                                .filter((user) => companionIds.includes(user.userId)) // Find matching users
                                                .slice(0, 2) // Show only the first two
                                                .map((user) => ( 
                                                    <div 
                                                        key={user.userId} 
                                                        onClick={() => handleRemoveCompanion(user.userId)} 
                                                        className="cursor-pointer relative group"
                                                    >
                                                        <div className="w-[50px] h-[50px] absolute flex items-center justify-center rounded-full bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <TrashIcon className="w-[25px] text-white" />                                                             </div>   
                                                                                                             
                                                        <Image
                                                            key={user.userId}
                                                            src={user.profileImage}
                                                            alt={user.name}
                                                            width={50}
                                                            height={50}
                                                            objectFit="cover"
                                                            className="rounded-full aspect-square object-cover mr-2"
                                                        />        
                                                        <div className="pr-2 flex w-full justify-center itmes-center absolute left-0 right-0 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                                            {user.name}                                                             </div>                                                    
                                                    </div>                                                                                                  
                                                ))} 
                                            {usersData.filter((user) => companionIds.includes(user.userId)).length > 2 && (
                                                <Popover className="relative">
                                                    <PopoverButton>
                                                        <div className="w-[50px] h-[50px] flex items-center justify-center rounded-full bg-gray-300 text-white font-bold text-lg">
                                                            +{usersData.filter((user) => companionIds.includes(user.userId)).length - 2}
                                                        </div>
                                                    </PopoverButton>
                                                    <PopoverPanel 
                                                        anchor="bottom" 
                                                        transition
                                                        className="w-[10%] mt-4 rounded-xl bg-white text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
                                                    >
                                                        <div className="absolute -top-2 left-4 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white"></div>                                                                                                                 
                                                        <div className="flex flex-col gap-2">
                                                            {usersData
                                                                .filter((user) => companionIds.includes(user.userId))
                                                                .slice(2)
                                                                .map((user) => (
                                                                <div key={user.userId} className="flex justify-between items-center block rounded-lg py-1 px-2 transition">                                                                        
                                                                    <span className="text-black">{user.name}</span>
                                                                    <TrashIcon 
                                                                        className='w-5 h-5 cursor-pointer' 
                                                                        onClick={() => handleRemoveCompanion(user.userId)}    
                                                                    />
                                                                </div>
                                                            ))} 
                                                        </div>                                                         
                                                    </PopoverPanel>
                                                </Popover>                                                 
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="mt-auto flex justify-center w-full">
                                <BaseButton 
                                    buttonTxt="Start Planning" 
                                    onClick={() => setIsOpen(true)}
                                    className="!px-10"
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <DialogBox 
                isOpen={isOpen} 
                setIsOpen={setIsOpen} 
                onConfirm={handleClickStartPlanning}
                dialogTxt={dialogTxt} 
            />
        </div>
    );
}
