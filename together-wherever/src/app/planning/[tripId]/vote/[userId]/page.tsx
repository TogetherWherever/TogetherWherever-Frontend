'use client';

// External Libraries
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { ClipLoader } from "react-spinners";
import { format } from "date-fns";
import { ArrowLeftIcon, EllipsisHorizontalIcon, ArrowRightIcon, ShareIcon } from "@heroicons/react/24/solid";
import Image from 'next/image';

// Internal Imports
import { BaseButton } from "@/app/components/buttons/BaseButton";
import DialogBox from "@/app/components/Dialog";
import VotingCard from "./VotingCard";

import { VOTING_CONFIRMATION_DIALOG } from "@/app/constants/vote";
import { useDestinationVoting } from "@/app/hooks/vote/useDestinationVoting";

export default function VotingPage() {
    const {
        tripDetails,
        destinations,
        scores,
        handleScoreChange,
        handleCompleteVote,
        handleClickBackButton,
        loading,
        isOpen,
        setIsOpen
    } = useDestinationVoting();

    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center">
                <ClipLoader size={50} color={"#60993E"} loading={loading} />
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full h-full">
            {/* Header */}
            <div className="flex h-14 justify-between w-full items-center px-5 py-10">
                <div className="flex w-full h-full items-center gap-2">
                    <ArrowLeftIcon className="h-8 cursor-pointer" onClick={handleClickBackButton} />
                    <Image src="/logo.png" alt="Logo" width={1000} height={1000} className="h-14 w-auto" />
                </div>
                <div className="flex h-full">
                    <div className="flex w-full h-full gap-2 items-center justify-end">
                        <label className="text-xl"> Companions: </label>
                        {tripDetails?.companion && tripDetails.companion.length > 0 && (
                            <div className="flex items-center">
                                {tripDetails?.companion
                                    .slice(0, 4)
                                    .map((user: any) => (
                                        <div key={user.username} className="flex flex-col group items-center">
                                            <div className="w-[40px] h-[40px]">
                                                <Image
                                                    src={user.profilePic}
                                                    alt={user.username}
                                                    width={40}
                                                    height={40}
                                                    className="rounded-full aspect-square object-cover"
                                                />
                                            </div>

                                            <div className="absolute mt-[40px] flex text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                                {user.username}
                                            </div>
                                        </div>
                                    ))}
                                {tripDetails?.companion?.length > 4 && (
                                    <Popover className="relative">
                                        <PopoverButton>
                                            <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-gray-300 text-white font-bold text-lg">
                                                <EllipsisHorizontalIcon className="h-[30px] w-[30px]" />
                                            </div>
                                        </PopoverButton>
                                        <PopoverPanel
                                            className="w-[10%] mt-4 rounded-xl bg-white text-sm/6 transition duration-200 ease-in-out"
                                        >
                                            <div className="flex flex-col gap-2">
                                                {tripDetails?.companion.slice(4).map((user: any) => (
                                                    <div key={user.username} className="flex justify-between items-center block rounded-lg py-1 px-2 transition">
                                                        <Image
                                                            src={user.profilePic}
                                                            alt={user.username}
                                                            width={30}
                                                            height={30}
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
                            className="border bg-transparent !h-[40px] !border-2 border-earth-yellow !text-earth-yellow !px-4 py-2 !gap-3"
                            leftIcon={ShareIcon}
                            leftIconCustomization="w-[25px] h-[25px]"
                            onClick={() => alert("Share")}
                        />
                    </div>
                </div>
            </div>
            {/* Trip Image Section */}
            <div
                className="h-[200px] w-full bg-cover bg-center relative flex flex-col justify-between py-6 pl-4"
                style={{ backgroundImage: `url(${tripDetails?.photo ?? ""})` }}
            >
                <label className="text-6xl text-white"> {tripDetails?.tripName ?? "Trip"} </label>
                <div className="flex w-1/4 justify-center bg-black bg-opacity-50 px-2 py-1 rounded-lg gap-4">
                    <label className="text-white text-2xl"> {tripDetails?.startDate ? format(tripDetails.startDate, 'MM/dd/yy') : "N/A"} </label>
                    <ArrowRightIcon className="w-[20px] text-white" />
                    <label className="text-white text-2xl"> {tripDetails?.lastDate ? format(tripDetails.lastDate, 'MM/dd/yy') : "N/A"} </label>
                </div>
            </div>

            {/* Voting Section */}
            <div className="py-8 px-4 w-full">
                <div className="flex gap-4 justify-between items-end py-4 border-b-2 border-black/50">
                    <div className="flex items-end gap-4">
                        <label className="text-4xl">
                            {tripDetails?.voting_date ? format(tripDetails.voting_date, "EEEE, MMMM dd") : "Voting Date"}
                        </label>
                        <div className="text-white bg-indian-yellow text-xl rounded-lg p-1 px-10">
                            {tripDetails?.destinations?.length ?? 0} Places Available
                        </div>
                    </div>
                    <label className="text-xl">
                        Total member votes: {tripDetails?.members_voted ?? 0} / {tripDetails?.total_members ?? 0}
                    </label>
                </div>

                {/* Destination Voting Cards */}
                <div className="grid grid-cols-2 gap-8 py-8">
                    {(destinations ?? []).map((destination: any, index: number) => (
                        <div
                            key={destination.destID}
                            className={`flex ${index % 2 === 0 ? "justify-self-start" : "justify-self-end"}`}
                        >
                            <VotingCard
                                destinations={destination}
                                value={scores[destination.destID] || 0}
                                onChange={(values: number[]) => handleScoreChange(destination.destID, values[0])}
                            />
                        </div>
                    ))}
                </div>
                <div className="flex justify-end">
                    <BaseButton
                        buttonTxt="Complete Vote"
                        className="!px-10"
                        onClick={() => setIsOpen(true)}
                    />
                </div>
            </div>
            <DialogBox
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                onConfirm={handleCompleteVote}
                dialogTxt={VOTING_CONFIRMATION_DIALOG}
            />
        </div>
    );
}
