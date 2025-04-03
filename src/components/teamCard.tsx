import { Team } from "../types/team";

interface teamCardProps {
  team: Team;
}

const teamCard: React.FC<teamCardProps> = ({ team }) => {
    return (
      <div className="flex flex-col gap-4 rounded-lg min-w-60 flex-1">
        <div
          className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
          style={{ backgroundImage: `url(${team.logo})` }}
        />
        <div>
          <p className="text-white text-base font-medium leading-normal">{team.name}</p>
        </div>
      </div>
    );
  };
  
  export default teamCard;
  