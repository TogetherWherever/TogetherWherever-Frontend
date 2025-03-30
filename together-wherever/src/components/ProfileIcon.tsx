export default function ProfileIcon ({username, width=40, height=40}: {username: string | undefined, width: number, height: number}) {
    return (
        <div className={`flex justify-center items-center w-[${width}px] h-[${height}px] rounded-full bg-asparagus-green`}>
            <label className="text-base font-bold text-white">
                {username && username.charAt(0)}
            </label>
        </div>
    );
};