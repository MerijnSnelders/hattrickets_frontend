import {  useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMatchById } from "../services/matchService";
import { Match } from "../types/match";
import { buyTicket } from "../services/ticketService";
import Swal from 'sweetalert2';
import { isLoggedIn } from "@/services/loginService";
import { useNavigate } from 'react-router-dom';
import { getSeatsForMatch } from "@/services/seatService";
import { Seat } from "@/types/seat";
import { useSeatWebSocket } from "@/hooks/useSeatWebSocket";
import { formatDistanceToNowStrict } from "date-fns";



 

export default function MatchDetails() {
    const { matchId } = useParams<{ matchId: string }>();
    const parsedMatchId = matchId ? parseInt(matchId, 10) : undefined;
    const [match, setMatch] = useState<Match>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [userId, setUserId] = useState<number>();
    const [seats, setSeats] = useState<Seat[]>([]);
    const [selectedSeatIndex, setSelectedSeatIndex] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedRow, setSelectedRow] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState(1);
    const [liveSeatStatus, setLiveSeatStatus] = useState<Record<string, { status: string; userId: number; selectedUntil: string | null }>>({});
    const [currentlySelectedKey, setCurrentlySelectedKey] = useState<string | null>(null);

    const navigate = useNavigate();
    

    const price = 12.5;

    const { sendSeatSelection } = useSeatWebSocket(parsedMatchId ?? 0, (message) => {
      const key = `${message.row}-${message.seatIndex}`;
      setLiveSeatStatus((prev) => ({ ...prev, [key]: { status: message.status, userId: message.userId, selectedUntil: message.selectedUntil ?? null }}));
    },
    currentlySelectedKey,
    userId
  );
  
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
          try{
            const seatsData = await getSeatsForMatch(id, currentPage, 200, selectedRow);
            console.log("SEATS DATA:", seatsData);
             const updatedLiveStatus: Record<string, { status: string; userId: number, selectedUntil: string }> = {};

          const mappedSeats = seatsData.content.map((wrapper: any) => {
            const seat = wrapper.seat;
            const key = `${seat.row}-${seat.seatIndex}`;
          

            if (wrapper.selected) {
              updatedLiveStatus[key] = {
                status: "selected",
                userId: wrapper.selectingUserId,
                selectedUntil: "0"
              };
              
              if (wrapper.selectingUserId === userId) {
                setCurrentlySelectedKey(key);
                setSelectedRow(seat.row);
                setSelectedSeatIndex(seat.seatIndex);
              }
            } 
            else if (seat.reserved) {
              updatedLiveStatus[key] = {
                status: "reserved",
                userId: -1,
                selectedUntil: "0"
              };
            }

            return {
              id: seat.id,
              row: seat.row,
              seatIndex: seat.seatIndex,
              isReserved: seat.reserved,
            };
          });
          setSeats(mappedSeats)
          setLiveSeatStatus(prev => ({ ...prev, ...updatedLiveStatus }));
          setTotalPages(seatsData.totalPages); 
          }
          catch(error){
            setError("failed to set seats: " + error)
          }
        } catch (error) {
          setError("Failed to load match data");
        } finally {
          setLoading(false);
        }
      }
  
      if (matchId) fetchMatch();
    }, [matchId, currentPage, selectedRow]);
  
    const handleBuyTicket = async () => {
      try {
        if (!matchId) throw new Error("No match ID");
        if (!userId) throw new Error("No user ID");
        if(!selectedRow) throw new Error("no selected row")
        if(!selectedSeatIndex) throw new Error("no selected seat idex")
        const response = await buyTicket({userId: userId, matchId: parsedMatchId ?? 0, price: price, row: selectedRow, seatIndex: selectedSeatIndex});
        sendSeatSelection(selectedRow, selectedSeatIndex, "reserved", userId ?? 0);
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

    const handleSeatClick = (seat: Seat) => {
      
      const key = `${seat.row}-${seat.seatIndex}`;
      const statusObj = liveSeatStatus[key];
      const selectedEntry = Object.entries(liveSeatStatus).find(
      ([key, value]) => value.status === "selected" && value.userId === userId
);
      
      if (seat.isReserved || (statusObj?.status === "selected" && statusObj.userId !== userId)) {
        return;
      }
      if (currentlySelectedKey === key) {
        setSelectedRow(null);
        setSelectedSeatIndex(null);
        setCurrentlySelectedKey(null);
        sendSeatSelection(seat.row, seat.seatIndex, "available", userId ?? 0);
      } else {
          if(selectedEntry){
          const [prevRow, prevIndex] = selectedEntry?.[0].split('-');
          sendSeatSelection(prevRow, parseInt(prevIndex), "available", userId ?? 0);
          }
        setSelectedRow(seat.row);
        setSelectedSeatIndex(seat.seatIndex);
        setCurrentlySelectedKey(key);
        sendSeatSelection(seat.row, seat.seatIndex, "selected", userId ?? 0);
      }
    };
    useEffect(() => {
      const interval = setInterval(() => {
        setLiveSeatStatus((prev) => ({ ...prev }));
      }, 1000);

      return () => clearInterval(interval);
    }, []);
  
    if (loading) return <div className="p-4">Loading...</div>;
    if (error) return <div className="p-4 text-red-500">{error}</div>;
    if (!match) return <div className="p-4">No data found</div>;
  
    return (
      <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Match Details</h1>

      {/* Stadion afbeelding */}
      <div className="mb-6">
        <img
          src={match.stadium.image || "/placeholder-stadium.jpg"}
          alt={match.stadium.name}
          className="w-full h-64 object-contain rounded-xl shadow-lg "
        />
        <p className="mt-2 text-lg font-semibold text-center">{match.stadium.name}</p>
      </div>

      {/* Match info */}
      <div className="bg-[#008000] rounded-2xl shadow p-6 flex items-center justify-between">
        {/* Home team */}
        <div className="text-center">
          <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="h-20 mx-auto mb-2" />
          <p className="text-xl font-semibold">{match.homeTeam.name}</p>
        </div>

        {/* Match metadata */}
        <div className="text-center max-w-xs">
          <p className="text-white text-lg mb-2 font-semibold">{match.homeTeam.name} vs {match.awayTeam.name}</p>
          <p className="text-sm">Stadium: {match.stadium.name}</p>
          <p className="text-sm">Date: {new Date(match.date).toLocaleDateString()}</p>
          <p className="text-sm mb-4">Sold tickets: {match.soldTickets}</p>
          <button
            onClick={handleBuyTicket}
            className="w-full px-4 py-2 bg-[#19e619] text-[#112211] text-sm font-bold rounded-xl"
          >
            Buy Ticket – €{price}
          </button>
        </div>

        {/* Away team */}
        <div className="text-center">
          <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="h-20 mx-auto mb-2" />
          <p className="text-xl font-semibold">{match.awayTeam.name}</p>
        </div>
      </div>
      <div>
        <h1 className="text-xl font-semibold">Select a seat</h1>

        <label className="block mb-2 text-white">
  Filter by row:
  <select
    value={selectedRow ?? ""}
    onChange={(e) => {
      setSelectedRow(e.target.value || null);
      setCurrentPage(0);
    }}
    className="bg-[#19e619] border border-gray-300 text-white-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  >
    <option value="">All</option>
    {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map(letter => (
      <option key={letter} value={letter}>{letter}</option>
    ))}
  </select>
</label>

<div className="flex justify-center mt-6 gap-4 mb-6">
        <button
          onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
          disabled={currentPage === 0}
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center rounded-xl h-10 px-4 bg-[#19e619] text-[#112211] text-sm font-bold leading-normal tracking-[0.015em] disabled:opacity-50"
        >
          Previous
        </button>
        <span className="mt-2 text-sm text-center">Page {currentPage + 1} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage + 1 >= totalPages}
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center rounded-xl h-10 px-4 bg-[#19e619] text-[#112211] text-sm font-bold leading-normal tracking-[0.015em] disabled:opacity-50"
        >
          Next
        </button>
        </div>
        <div className="grid grid-cols-10 gap-2">
          
        {seats.map(seat => {
          const key = `${seat.row}-${seat.seatIndex}`;
          const statusObj = liveSeatStatus[key];
          const status = statusObj?.status;
          const seatOwnerId = statusObj?.userId;
          const isSelectedByMe = status === "selected" && seatOwnerId === userId;
          const isSelectedByOthers = status === "selected" && seatOwnerId !== userId;
          const remainingTime = status === "selected" && seatOwnerId === userId && statusObj?.selectedUntil
            ? Math.max(0, Math.floor((new Date(statusObj.selectedUntil).getTime() - new Date().getTime()) / 1000))
            : null;

          const isDisabled = seat.isReserved || 
                   (statusObj && (statusObj.status === "reserved" || 
                   (statusObj.status === "selected" && statusObj.userId !== userId)));
          return (
          <button
          
            key={seat.id}
            disabled={isDisabled}
            className={`p-2 border rounded ${
                        seat.isReserved || status === "reserved"
                          ? "bg-gray-400"
                          : isSelectedByMe
                          ? "bg-blue-500 text-white"
                          : isSelectedByOthers
                          ? "bg-yellow-400"
                          : "bg-green-500"
                      }`}
            onClick={() => handleSeatClick(seat)}
          >
            {`${seat.row}${seat.seatIndex}`}
            {isSelectedByMe && remainingTime !== null && (
              <div className="text-xs mt-1 text-white">{remainingTime}s</div>
            )}
          </button>
          );
        })}
      </div>
      </div>
    </div>
    );
  }
  