import Image from 'next/image';
import { SunIcon, MoonIcon, CloudIcon } from "@heroicons/react/24/solid";import { useRouter } from "next/navigation";
import clsx from "clsx";

interface DestDataInterface {
    destID: string,
    destName: string,
    photo: string,
    desc: string,
    openDays: Array<string>,
    openTime: string,
    closeTime: string,
    lat: number,
    lng: number
}

interface DestCardPropsInterface {
    destData: DestDataInterface,
    complete?: boolean
    period?: string;
};

export default function DestCard({ destData, complete, period }: DestCardPropsInterface) {
    const router = useRouter();

    const handleNavigateToDiscoverPageDetail = () => {
        router.push(`/discover/${destData.destID}`)
    };

    return (
        <div
            className={clsx(
                "flex justify-left p-4 gap-4 rounded-lg bg-satin-linen h-[150px] cursor-pointer",
                complete ? "w-full" : "w-[500px]"
            )}
            onClick={handleNavigateToDiscoverPageDetail}
        >
            <div className='flex items-center w-[250px]'>
                <Image
                    src={destData.photo}
                    alt="Logo"
                    width={200}
                    height={200}
                    className=""
                />
            </div>
            
            <div className={clsx("flex flex-col justify-between h-full", complete ? "" : "w-2/3")}>
                <div className="flex items-center gap-2 text-2xl"> 
                    {/* <div>
                        {period === "morning" && <SunIcon className="w-6 h-6 text-yellow" />}
                        {period === "afternoon" && <CloudIcon className="w-6 h-6 text-blue" />}
                        {period === "night" && <MoonIcon className="w-6 h-6 text-gray" />}
                    </div> */}
                    <label>{destData.destName} </label>
                </div>
                <div className="overflow-hidden text-ellipsis line-clamp-3 text-lg">
                    {destData.desc}
                </div>
            </div>
        </div>
    )
};