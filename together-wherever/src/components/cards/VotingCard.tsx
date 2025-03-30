import Image from 'next/image';
import { Range, getTrackBackground } from 'react-range';
import { MapPinIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

interface VotingCardPropsInterface {
  destinations: {
    destID: string;
    destName: string;
    photo: string;
  };
  value: number;
  onChange: (e: any) => void;
};

const STEP = 1;
const MIN = 1;
const MAX = 10;

export default function VotingCard({ destinations, value, onChange }: VotingCardPropsInterface) {
  const router = useRouter();

  const handleNavigateToDiscoverPageDetail = () => {
    window.open(`/discover/${destinations.destID}`, '_blank');
  };

  return (
    <div className='flex gap-4 h-[200px]'>
      <div className="cursor-pointer relative h-[200px] w-[240px] rounded-xl overflow-hidden" onClick={handleNavigateToDiscoverPageDetail}>
        <Image
          src={destinations.photo}
          alt="Destination Image"
          fill
          className="object-cover"
        />
      </div>
      <div className='flex flex-col h-[200px] w-[400px] rounded-lg bg-satin-linen p-8 justify-between'>
        <div className='flex items-center '>
          <MapPinIcon width={40} height={40} fill="red" />
          <div className='font-bold text-lg underline cursor-pointer' onClick={handleNavigateToDiscoverPageDetail}>
            {destinations.destName}
          </div>
        </div>
        <div className="mt-4 flex justify-center items-center w-full pl-4 gap-4">
          <Range
            values={[value]}
            step={STEP}
            min={MIN}
            max={MAX}
            onChange={onChange}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                className="w-full h-2 bg-gray-300 rounded-lg relative flex items-center"
                style={{
                  background: getTrackBackground({
                    values: [value],
                    colors: ["#009FB7", "#ccc"],
                    min: MIN,
                    max: MAX,
                  }),
                }}
              >
                {children}
              </div>
            )}
            renderThumb={({ props, isDragged }) => (
              <div
                {...props}
                className={`mt-4 w-6 h-6 bg-white border border-gray-400 rounded-full flex items-center justify-center shadow-md ${isDragged ? "border-moonstone-blue" : ""
                  }`}
              >
                <div className="w-1 h-4 bg-gray-500" />
              </div>
            )}
          />
          {/* Display Score */}
          <span className="text-xl font-semibold text-moonstone-blue">{value.toFixed(0)}</span>
        </div>
      </div>
      {/* Slider */}
    </div>
  );
};