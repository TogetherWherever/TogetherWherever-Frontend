'use client';

import MapView from "@/app/components/Map";
import { ArrowLeftIcon, ArrowRightIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import Image from 'next/image';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { BaseButton } from "@/app/components/buttons/BaseButton";
import { ShareIcon } from '@heroicons/react/24/solid';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addDays, format } from "date-fns";
import TripDayDropDown from './TripDayDropDown';
import { useAuth } from "@/app/hooks/useAuth";

const mockTripDetailData = {
    tripName: "Trip To: Phuket",
    startDate: new Date(),
    lastDate: addDays(new Date(), 7),
    photo: "https://lh3.googleusercontent.com/places/ANXAkqEDRzE8jNSwMQEMHh667pTZnFMgvKYmkKLkYYA_km5wVT3kq28gdgDLcCuiFUYchxgsOj018x9n4ZjdMsIlLevCErBxPo7J0UY=s4800-w600-h600",
    lat: 7.878978,
    lng: 98.398392,
    trip_day: [
        {
            destID: "ChIJOSmXz2AvUDARXCxlBBs7y38",
            destName: "The Big Buddha",
            photo: "https://lh3.googleusercontent.com/gps-cs-s/AB5caB8R2-W1BiFfDus87rupQ4oqmeYm7XYeph3c5rYizfqwxBoRB3WTe_E_fd7STBdNwy-xnbtaK2FqzLXBWMxoj2NhD4BX8fF9fWNdYK6JzYAlSZ1PfiAuUFbfAiwx6HEIpUdxYQhfwA=w353-h256-k-no",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia dolor in augue auctor, at euismod nisl placerat. Fusce ac erat sed felis consequat tempus.",
            openDays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            lat: 7.827868593792716,
            lng: 98.31278865581969
        },
        {
            destID: "ChIJQSLg8hg6UDARpDYnTS8kgLM",
            destName: "Phuket FantaSea",
            photo: "https://lh3.googleusercontent.com/gps-cs-s/AB5caB-nZEevBXD7TX3-w1mRY3C7YFuXCHhf4PqrH88xQXdBOE2HbFcXg01EPwqxNrULpfAMWODPDyQc-ZiSVR3QDg9U4PG7zYgt6dmqUECqw-teImfTKn_RUwKeoVrKy-Q1xDIAvr0=s1360-w1360-h1020-rw",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia dolor in augue auctor, at euismod nisl placerat. Fusce ac erat sed felis consequat tempus.",
            openDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            lat: 7.956695821596965,
            lng: 98.28742629999998
        },
        {
            destID: "ChIJ_YjQ6uQxUDARHVetUBkoi9k",
            destName: "Andamanda Phuket",
            photo: "https://lh3.googleusercontent.com/p/AF1QipPsrXH0SQaoPL2QuXn_tzad7R8tamEuFhj-8KZu=s1360-w1360-h1020-rw",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia dolor in augue auctor, at euismod nisl placerat. Fusce ac erat sed felis consequat tempus.",
            openDays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            lat: 7.904687851358944,
            lng: 98.36365107116391
        }
    ],
    companion: [
        {username: "Christopher", profilePic: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"},
        {username: "Bob", profilePic: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"},
        {username: "Susan", profilePic: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"},
        {username: "Richard", profilePic: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"},
        {username: "Johny", profilePic: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"},
        {username: "Justin", profilePic: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"},
    ]
};

export default function Planning() {
    const isAuthenticated = useAuth();

    if (!isAuthenticated) return null;

    const router = useRouter();
    const [destDetails] = useState(mockTripDetailData); // using mock data
    const tripDuration = (destDetails.lastDate.getTime() - destDetails.startDate.getTime()) / (1000 * 3600 * 24) + 1;

    const markers = destDetails.trip_day.map((dest) => ({
        lat: dest.lat,
        lng: dest.lng,
    }));

    const renderTripDayDropDown = (duration: number, startDate: Date, tripDay: Array<any>) => {
        return Array.from({ length: duration }, (_, index) => {
            const tripDate = addDays(startDate, index);
            const dayOfWeek = format(tripDate, "EEEE");

            const destinationsForDay = tripDay.filter(dest => dest.openDays.includes(dayOfWeek))
            .map(dest => ({
                ...dest,
            }));

            return <TripDayDropDown key={index} tripDate={tripDate} tripDay={destinationsForDay}/>;
        });
    };

    return (
        <div className="flex flex-row w-full h-full">
            {/* Left Panel: Search and Place Details */}
            <div className="w-2/3 flex flex-col gap-4">
                <div className="flex justify-between h-14 items-center pt-5 px-5">
                    <div className="flex w-full h-full items-center gap-2">
                        <ArrowLeftIcon className="h-8 cursor-pointer" onClick={() => router.back()}/>
                        <Image src="/logo.png" alt="Logo" width={1000} height={1000} className="h-14 w-auto pr-4" />
                    </div>
                    <div className="flex w-full h-full gap-2 items-center justify-end">
                        <label className="text-xl"> Companions: </label>
                        {destDetails.companion.length > 0 && (
                            <div className="flex items-center">
                                {destDetails.companion // Find matching users
                                    .slice(0, 4) // Show only the first two
                                    .map((user) => (
                                        <div className="flex flex-col group items-center">
                                            <div className="w-[40px] h-[40px]">
                                                <Image
                                                    key={user.username}
                                                    src={user.profilePic}
                                                    alt={user.username}
                                                    width={40}
                                                    height={40}
                                                    objectFit="cover"
                                                    className="rounded-full aspect-square object-cover"
                                                />
                                            </div>

                                            <div className="absolute mt-[40px] flex text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                                {user.username}
                                            </div>
                                        </div>
                                    ))}
                                {destDetails.companion.length > 4 && (
                                    <Popover className="relative">
                                        <PopoverButton>
                                            <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-gray-300 text-white font-bold text-lg">
                                                <EllipsisHorizontalIcon className="h-[30px] w-[30px]"/>
                                            </div>
                                        </PopoverButton>
                                        <PopoverPanel
                                            anchor="bottom"
                                            transition
                                            className="
                                                w-[10%] mt-4 rounded-xl bg-white text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0
                                            "
                                        >
                                                <div className="flex flex-col gap-2">
                                                    {destDetails.companion
                                                        .slice(4)
                                                        .map((user) => (
                                                        <div key={user.username} className="flex justify-between items-center block rounded-lg py-1 px-2 transition">
                                                            <Image
                                                                key={user.username}
                                                                src={user.profilePic}
                                                                alt={user.username}
                                                                width={30}
                                                                height={30}
                                                                objectFit="cover"
                                                                className="rounded-full aspect-square object-cover"
                                                            />
                                                            <span className="text-black text-base">{user.username}</span>
                                                        </div>
                                                    ))}
                                            </div>
                                        </PopoverPanel>
                                    </Popover>
                                )}
                            </div>
                        )}
                        <BaseButton
                            buttonTxt="Share"
                            color=""
                            className="border !h-[40px] !border-2 border-earth-yellow !text-earth-yellow !px-4 py-2 !gap-3"
                            leftIcon={ShareIcon}
                            leftIconCustomization="w-[25px] h-[25px]"
                            onClick={() => alert("Share")}
                        />
                    </div>
                </div>
                <div className="w-full mt-1 h-full">
                    <div
                        className="h-[300px] w-full bg-cover bg-center relative flex flex-col justify-between py-6 pl-4"
                        style={{ backgroundImage: `url(${destDetails.photo})` }}
                    >
                        <label className="text-6xl text-white"> {destDetails.tripName} </label>
                        <div className="flex w-1/3 justify-center bg-black bg-opacity-50 px-2 py-1 rounded-lg">
                            <label className="text-white text-2xl"> {format(destDetails.startDate, 'MM/dd/yy')} </label>
                            <ArrowRightIcon className="w-[20px] text-white"/>
                            <label className="text-white text-2xl"> {format(destDetails.lastDate, 'MM/dd/yy')} </label>
                        </div>
                    </div>
                    <div className="w-full pt-12 py-6 pr-12 px-4 flex flex-col gap-2">
                        {renderTripDayDropDown(tripDuration, destDetails.startDate, destDetails.trip_day)}
                    </div>
                </div>
            </div>

            {/* Right Panel: Map View */}
            <div className="w-1/3">
                <MapView lat={destDetails.lat} lng={destDetails.lng} makers={markers} />
            </div>
        </div>
    );
}