'use client';

// External Libraries
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { ClipLoader } from "react-spinners";
import { format } from "date-fns";
import { ArrowLeftIcon, EllipsisHorizontalIcon, ArrowRightIcon, ShareIcon } from "@heroicons/react/24/solid";
import Image from 'next/image';

// Internal Imports
import { BaseButton } from "@/components/buttons/BaseButton";
import DialogBox from "@/components/Dialog";
import VotingCard from "@/components/cards/VotingCard";
import ProfileIcon from "@/components/ProfileIcon";

import { VOTING_CONFIRMATION_DIALOG } from "@/constants/vote";
import { useDestinationVoting } from "@/hooks/useDestinationVoting";

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

    return (
        <>
            {loading ? (
                <div className="fixed inset-0 flex items-center justify-center">
                    <ClipLoader size={50} color={"#60993E"} loading={loading} />
                </div>
            ) : (
                <div className='flex justify-center w-full '>
                    <div className="flex flex-col w-full h-full max-w-[1500px]">
                        {tripDetails ? (
                            <>
                                {/* Header */}
                                <div className="flex h-14 justify-between w-full items-center px-5 py-10">
                                    <div className="flex w-full h-full items-center gap-2">
                                        <ArrowLeftIcon className="h-8 cursor-pointer" onClick={handleClickBackButton} />
                                        <Image src="/logo.png" alt="Logo" width={1000} height={1000} className="h-14 w-auto" />
                                    </div>
                                    <div className="flex h-full">
                                        <div className="flex w-full h-full gap-2 items-center justify-end pr-9">
                                            <label className="text-xl"> Companions: </label>
                                            {tripDetails?.companion && tripDetails.companion.length > 0 && (
                                                <div className="flex items-center">
                                                    {tripDetails?.companion
                                                        .slice(0, 4)
                                                        .map((user: any) => (
                                                            <div key={user.username} className="flex flex-col group items-center">
                                                                <div className="w-[40px] h-[40px]">
                                                                    <ProfileIcon username={user.username} width={40} height={40} />
                                                                </div>

                                                                <div className="absolute mt-[40px] flex text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                                                    {user.username}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    {tripDetails?.companion?.length > 4 && (
                                                        <Popover className="relative">
                                                            <PopoverButton>
                                                                <div
                                                                    className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-gray-300 text-white font-bold text-lg">
                                                                    <EllipsisHorizontalIcon className="h-[30px] w-[30px]" />
                                                                </div>
                                                            </PopoverButton>
                                                            <PopoverPanel
                                                                anchor="bottom"
                                                                transition
                                                                className="w-[10%] mt-4 rounded-xl bg-white text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
                                                            >
                                                                <div className="flex flex-col gap-2">
                                                                    {tripDetails?.companion.slice(4).map((user) => (
                                                                        <div key={user.username}
                                                                            className="flex justify-between items-center block rounded-lg py-1 px-2 transition">
                                                                            <ProfileIcon username={user.username} width={30} height={30} />
                                                                            <span className="text-black text-base">{user.username}</span>
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
                                </div>
                                {/* Trip Image Section */}
                                <div
                                    className="h-[200px] w-full bg-cover bg-center relative flex flex-col justify-between py-6 pl-4"
                                >
                                    <div className="absolute top-0 left-0 w-full h-full">
                                        <div className="absolute top-0 left-0 w-full h-full">
                                            <Image
                                                src={tripDetails.photo}
                                                alt="Background"
                                                layout="fill"
                                                objectFit="cover"
                                                quality={75}
                                            />
                                        </div>
                                    </div>
                                    <div className="z-10 h-full flex flex-col justify-between">
                                        <div className="text-6xl text-white"> {tripDetails?.tripName ?? "Trip"} </div>
                                        <div className="flex justify-center bg-black bg-opacity-50 px-2 py-1 rounded-lg gap-4 w-[400px]">
                                            <div className="text-white text-2xl"> {tripDetails?.startDate ? format(tripDetails.startDate, 'MM/dd/yy') : "N/A"} </div>
                                            <ArrowRightIcon className="w-[20px] text-white" />
                                            <div className="text-white text-2xl"> {tripDetails?.lastDate ? format(tripDetails.lastDate, 'MM/dd/yy') : "N/A"} </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Voting Section */}
                                <div className="py-8 px-4 w-full">
                                    <label className='text-2xl text-gray-500'>
                                        Vote for the main Destination on:
                                    </label>
                                    <div className="flex gap-4 votebreakpoint:flex-row flex-col votebreakpoint:justify-between votebreakpoint:items-end pt-2 pb-4 border-b-2 border-black/50">
                                        <div className="flex items-end gap-4">

                                            <div className="text-4xl">
                                                {tripDetails?.voting_date ? format(tripDetails.voting_date, "EEEE, MMMM dd") : "Voting Date"}
                                            </div>
                                            <div className="text-white bg-indian-yellow text-xl rounded-lg p-1 px-10">
                                                {tripDetails?.destinations?.length ?? 0} Places Available
                                            </div>
                                        </div>
                                        <div className="text-xl votebreakpoint:mt-0 mt-6">
                                            Total member votes: {tripDetails?.members_voted ?? 0} / {tripDetails?.total_members ?? 0}
                                        </div>
                                    </div>

                                    {/* Destination Voting Cards */}
                                    <div className="grid votebreakpoint:grid-cols-2 grid-cols-1 gap-8 py-8 w-full">
                                        {(destinations ?? []).map((destination: any, index: number) => (
                                            <div
                                                key={destination.destID}
                                                className={`flex w-full
                                                    ${index % 2 === 0 ? "justify-self-start" : index % 2 === 1 ? "justify-self-end" : ""}                                                    
                                                `}
                                            >                                                                                       
                                                <VotingCard
                                                    destinations={destination}
                                                    value={Math.max(scores[destination.destID] ?? 1, 1)}
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
                            </>
                        ) : (
                            <div className="fixed inset-0 flex items-center justify-center">
                                <div className="text-center text-gray-500">Loading...</div>
                            </div>
                        )}
                    </div>
                </div>
            )}

        </>

    );
}
