import { UserProfileDataType } from "@/utils/types";
import { BaseButton } from "@/components/buttons/BaseButton";

export default function ProfileCard({
    username,
    firstName,
    lastName,
    tripsCount,
    setIsLogout
}: UserProfileDataType) {

    return (
        <div className="flex lg:flex-row flex-col justify-between w-full h-full lg:h-[200px] rounded-3xl bg-satin-linen px-10 py-6 ">
            <div className="flex justify-start w-full gap-12">
                <div className="text-6xl font-bold text-white bg-pinkish-grey flex justify-center items-center rounded-full w-[160px] h-[160px]">
                    {username && username.charAt(0)}
                </div>
                <div className="flex flex-col justify-between items-center">
                    <div className="flex flex-col justify-beteen">
                        <div className="text-4xl font-bold">
                            {firstName} {lastName?.charAt(0)}.
                        </div>
                        <div className="text-xl text-gray-500">
                            @{username}
                        </div>
                    </div>
                    <div className="flex flex-col justify-between w-full">
                        <label className="text-xl font-bold">
                            Trips
                        </label>
                        <div className="text-xl">
                            {tripsCount}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center lg:mt-0 mt-6 lg:justify-end items-end ">
                <BaseButton
                    buttonTxt="Logout"
                    onClick={() => setIsLogout(true)}
                    className='!bg-red !text-xl !text-white !py-2 lg:!px-8 !px-[36vw] !rounded-2xl'
                />
            </div>
        </div >
    );
};