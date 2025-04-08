import { Link } from "react-router-dom";
import { Match } from "../types/match";

interface MatchCardProps {
  match: Match;
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  return (
    <Link to={`/match/${match.id}`}>
      <div className="flex flex-col gap-4 rounded-lg min-w-60 flex-1">
        <div
          className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
          style={{ backgroundImage: `url(${match.image})` }}
        />
        <div>
          <p className="text-white text-base font-medium leading-normal">{match.title}</p>
          <p className="text-[#93c893] text-sm font-normal leading-normal">{match.location}</p>
        </div>
      </div>
    </Link>
  );
};

export default MatchCard;
