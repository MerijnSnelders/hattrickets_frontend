import { useState } from "react";
import { buyTicket } from "../services/ticketService";

const BuyTicket = () => {
  const [userId, setUserId] = useState<number>(1);
  const [matchId, setMatchId] = useState<number>(1);
  const [price, setPrice] = useState<number>(12.5);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await buyTicket({ userId, matchId, price });
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl font-bold mb-4">Buy a Ticket</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="number"
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
          placeholder="User ID"
          className="border p-2 rounded"
        />
        <input
          type="number"
          value={matchId}
          onChange={(e) => setMatchId(Number(e.target.value))}
          placeholder="Match ID"
          className="border p-2 rounded"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          placeholder="Price"
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded">
          Buy Ticket
        </button>
      </form>
    </div>
  );
};

export default BuyTicket;
