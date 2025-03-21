import { Match } from "../types/match";

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
            <div key={index} className="flex flex-col gap-4 rounded-lg min-w-60 flex-1">
              <div
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                style={{ backgroundImage: `url(${match.image})` }}
              />
              <div>
                <p className="text-white text-base font-medium leading-normal">{match.title}</p>
                <p className="text-[#93c893] text-sm font-normal leading-normal">{match.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedMatches;
