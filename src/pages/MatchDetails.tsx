import {  useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMatchById } from "../services/matchService";
import { Match } from "../types/match";
import { buyTicket } from "../services/ticketService";
import Swal from 'sweetalert2';
import { isLoggedIn } from "@/services/loginService";
import { useNavigate } from 'react-router-dom';



export default function MatchDetails() {
    const { matchId } = useParams<{ matchId: string }>();
    const [match, setMatch] = useState<Match>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [userId, setUserId] = useState<number>();
    const navigate = useNavigate();
  
    // 👇 Deze horen buiten de handler
   // const userId = 1;
    const price = 12.5;
  
    useEffect(() => {
      async function fetchMatch() {
        try {
          try{
            const userIdData = await isLoggedIn();
            if(userIdData === null){
              navigate('/login')
            }
            else{
              setUserId(userIdData)
            }
          }
          catch{
            setError("Failed to load match data");
          }

          if (!matchId) throw new Error("No match ID");
          const id = parseInt(matchId, 10);
          const data = await getMatchById(id);
          setMatch(data);
        } catch (error) {
          setError("Failed to load match data");
        } finally {
          setLoading(false);
        }
      }
  
      if (matchId) fetchMatch();
    }, [matchId]);
  
    const handleBuyTicket = async () => {
      try {
        if (!matchId) throw new Error("No match ID");
        const parsedMatchId = parseInt(matchId, 10);
        if (!userId) throw new Error("No user ID");
        alert(userId);
        const response = await buyTicket({userId: userId, matchId: parsedMatchId, price});
        Swal.fire({
            icon: 'success',
            title: 'Ticket purchased!',
            text: 'You have successfully bought a ticket.',
            confirmButtonColor: '#19E619',
            confirmButtonText: 'Awesome!',
          });
        console.log("Gekocht ticket:", response);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Failed to purchase ticket',
          text: 'You were unable to purchase a ticket.',
          confirmButtonColor: '#19E619',
          confirmButtonText: 'Confirm'
        })
        console.error(error);
      }
    };
  
    if (loading) return <div className="p-4">Loading...</div>;
    if (error) return <div className="p-4 text-red-500">{error}</div>;
    if (!match) return <div className="p-4">No data found</div>;
  
    return (
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
            <button
              onClick={handleBuyTicket}
              className="min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center rounded-xl h-10 px-4 bg-[#19e619] text-[#112211] text-sm font-bold leading-normal tracking-[0.015em]"
            >
              <span className="truncate">Buy ticket</span>
            </button>
          </div>
          <div className="text-center">
            <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="h-16 mx-auto" />
            <p>{match.awayTeam.name}</p>
          </div>
        </div>
      </div>
    );
  }
  