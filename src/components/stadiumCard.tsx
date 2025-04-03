import { Stadium } from "../types/stadium";

interface StadiumCardProps {
  stadium: Stadium;
}

const StadiumCard: React.FC<StadiumCardProps> = ({ stadium }) => {
    return (
      <div className="flex flex-col gap-4 rounded-lg min-w-60 flex-1">
        <div
          className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
          style={{ backgroundImage: `url(${stadium.image})` }}
        />
        <div>
          <p className="text-white text-base font-medium leading-normal">{stadium.name}</p>
          <p className="text-[#93c893] text-sm font-normal leading-normal">Capacity: {stadium.capacity}</p>
        </div>
      </div>
    );
  };
  
  export default StadiumCard;
  
