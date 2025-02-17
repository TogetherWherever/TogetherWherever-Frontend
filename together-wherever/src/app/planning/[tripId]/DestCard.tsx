import Image from 'next/image';
import { useRouter } from "next/navigation";

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
    destData: DestDataInterface
};

export default function DestCard({ destData }: DestCardPropsInterface) {
    const router = useRouter();

    const handleNavigateToDiscoverPageDetail = () => {
        router.push(`/discover/${destData.destID}`)
    };

    return (
        <div
            className="flex justify-center p-4 gap-4 rounded-lg bg-satin-linen h-[150px] w-[500px] mb-4 cursor-pointer"
            onClick={handleNavigateToDiscoverPageDetail}
        >
            <Image
                src={destData.photo}
                alt="Logo"
                width={200}
                height={200}
                objectFit="cover"
                className=""
            />
            <div className="flex flex-col justify-between w-2/3 h-full">
                <div className="text-2xl"> {destData.destName} </div>
                <div className="overflow-hidden text-ellipsis line-clamp-3 text-lg">
                    {destData.desc}
                </div>
            </div>
        </div>
    )
};