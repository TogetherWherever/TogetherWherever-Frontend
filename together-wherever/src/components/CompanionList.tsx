import Image from 'next/image';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";

interface Companion {
  username: string;
  profilePic: string;
}

interface CompanionListProps {
  companions: Companion[];
}

export default function CompanionList({ companions }: CompanionListProps) {
  return (
    <div className="flex w-full h-full gap-2 items-center justify-end">
      <label className="text-xl"> Companions: </label>
      {companions.length > 0 && (
        <div className="flex items-center">
          {companions.slice(0, 4).map((user: any) => (
            <div className="flex flex-col group items-center" key={user.username}>
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
          {companions.length > 4 && (
            <Popover className="relative">
              <PopoverButton>
                <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-gray-300 text-white font-bold text-lg">
                  <EllipsisHorizontalIcon className="h-[30px] w-[30px]" />
                </div>
              </PopoverButton>
              <PopoverPanel className="w-[10%] mt-4 rounded-xl bg-white text-sm transition duration-200">
                <div className="flex flex-col gap-2">
                  {companions.slice(4).map((user: any) => (
                    <div key={user.username} className="flex justify-between items-center rounded-lg py-1 px-2 transition">
                      <Image src={user.profilePic} alt={user.username} width={30} height={30} className="rounded-full aspect-square object-cover" />
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
  );
}
