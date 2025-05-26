import { useEffect, useState } from "react";
import { filterMatches } from "@/services/matchService";
import DetailedMatchCard from "@/components/detailedMatchCard";
import { Match } from "@/types/match";


export default function MatchPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [teamFilter, setTeamFilter] = useState("");
  const [stadiumFilter, setStadiumFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const pageSize = 5;

  const fetchMatches = async () => {
    try {
      const response = await filterMatches(page, pageSize, teamFilter, stadiumFilter, dateFilter)
      setMatches(response.content);
      setTotalPages(response.totalPages);
    } catch (err) {
      console.error("Failed to load matches", err);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, [page]);

  return (
    <div className="p-6">
      <div className="flex gap-4 mb-6">
        <label className="flex flex-col min-w-40 h-10 max-w-64">
          <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
            <div
              className="text-[#93c893] flex border-none bg-[#244724] items-center justify-center pl-4 rounded-l-xl"
              data-icon="MagnifyingGlass"
              data-size="24px"
              data-weight="regular"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Team name"
              value={teamFilter}
              onChange={(e) => setTeamFilter(e.target.value)}
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#244724] focus:border-none h-full placeholder:text-[#93c893] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
            />
          </div>
        </label>
        <label className="flex flex-col min-w-40 h-10 max-w-64">
          <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
            <div
              className="text-[#93c893] flex border-none bg-[#244724] items-center justify-center pl-4 rounded-l-xl"
              data-icon="MagnifyingGlass"
              data-size="24px"
              data-weight="regular"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
              </svg>
            </div>
            <input
          type="text"
          placeholder="Stadium name"
          value={stadiumFilter}
          onChange={(e) => setStadiumFilter(e.target.value)}
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#244724] focus:border-none h-full placeholder:text-[#93c893] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
            />
          </div>
        </label>
        <label className="flex flex-col min-w-40 h-10 max-w-64">
          <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="form-input w-full flex-1 resize-none overflow-hidden rounded-xl border-0 bg-[#244724] px-4 pl-2 text-base text-white placeholder:text-[#93c893] focus:outline-none focus:ring-0"
            />
          </div>
        </label>
        <button
          onClick={() => {
            setPage(0); // Reset naar eerste pagina bij nieuwe filter
            fetchMatches();
          }}
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center rounded-xl h-10 px-4 bg-[#19e619] text-[#112211] text-sm font-bold leading-normal tracking-[0.015em]"
        >
          Apply
        </button>
      </div>
      <h1 className="text-3xl font-bold mb-6 text-white">All Matches</h1>

      <div className="flex flex-col gap-6">
        {matches.map((match) => (
          <DetailedMatchCard match={match}/>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 gap-4">
        <button
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center rounded-xl h-10 px-4 bg-[#19e619] text-[#112211] text-sm font-bold leading-normal tracking-[0.015em] disabled:opacity-50"
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 0}
        >
          Previous
        </button>
        <span className="text-white">Page {page + 1} of {totalPages}</span>
        <button
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center rounded-xl h-10 px-4 bg-[#19e619] text-[#112211] text-sm font-bold leading-normal tracking-[0.015em] disabled:opacity-50"
          onClick={() => setPage((p) => p + 1)}
          disabled={page + 1 >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
