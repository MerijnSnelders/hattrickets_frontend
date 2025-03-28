import { Match } from "../types/match";
import MatchCard from "./matchCard";

interface FeaturedMatchesProps {
  matches: Match[];
}

const FeaturedMatches: React.FC<FeaturedMatchesProps> = ({ matches }) => {
  return (
    <div>
      <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
        Featured Matches
      </h3>
      <div className="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex items-stretch p-4 gap-3">
          {matches.map((match, index) => (
            <MatchCard key={index} match={match} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedMatches;
