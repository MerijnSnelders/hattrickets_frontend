import { Match } from "@/types/match";
import { Link } from "react-router-dom";

interface MatchCardProps {
  match: Match;
}

const DetailedMatchCard: React.FC<MatchCardProps> = ({match}) => {

    return(
        <Link to={`/match/${match.id}`}>
        <div className="p-6">
        <h1 className="text-2xl font-bold mb-4 text-white">Match Details</h1>
        <div className="bg-[#008000] text-white rounded-2xl shadow p-6 flex items-center justify-between">
          <div className="text-center">
            <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="h-16 mx-auto" />
            <p>{match.homeTeam.name}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-white">
              {match.stadium.name}
            </p>
            <p className="text-sm text-white">
              sold tickets: {match.soldTickets}
            </p>
            {/* <button
              onClick={handleBuyTicket}
              className="min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center rounded-xl h-10 px-4 bg-[#19e619] text-[#112211] text-sm font-bold leading-normal tracking-[0.015em]"
            >
              <span className="truncate">Buy ticket</span>
            </button> */}
          </div>
          <div className="text-center">
            <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="h-16 mx-auto" />
            <p>{match.awayTeam.name}</p>
          </div>
        </div>
      </div>
      </Link>
)};
export default DetailedMatchCard;