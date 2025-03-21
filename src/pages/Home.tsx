import "../styles/home.css";
import { Match } from "../types/match";
import FeaturedMatches from "../components/featuredMatches";
import { useEffect, useState } from "react";
import { getUpComingMatches } from "../services/matchService";

const Home = () =>{

  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await getUpComingMatches(39, 2023, 5);
        console.log("Raw API Matches:", data);

        const transformedMatches: Match[] = data.map((match: any) => ({
          image: match.homeTeam.logo, 
          title: `${match.homeTeam.name} vs ${match.awayTeam.name}`,
          location: match.stadium.name,
        }));
        console.log("Transformed Matches:", transformedMatches);
        setMatches(transformedMatches);
      } 
      catch (error) {
        console.error(error);
      } 
      finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);



  return (<div className="px-40 flex flex-1 justify-center py-5">
    <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
      {/* Hero Section */}
      <div className="@container">
        <div className="@[480px]:p-4">
          <div
            className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-4"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://www.cursor.tue.nl/fileadmin/_processed_/6/1/csm_Profpraat_PSV-stadion_Shutterstock_Uslatar_102e37489c.jpg")',
            }}
          >
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl">
                Exclusive tickets for the biggest matches
              </h1>
              <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base">
                Join us on our mission to build the ultimate fan experience. Sign up to be the first to get exclusive access to tickets, experiences and more.
              </h2>
            </div>
            <label className="flex flex-col min-w-40 h-14 w-full max-w-[480px] @[480px]:h-16">
              <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
                <div
                  className="text-[#93c893] flex border border-[#346534] bg-[#1a321a] items-center justify-center pl-[15px] rounded-l-xl border-r-0"
                  data-icon="MagnifyingGlass"
                  data-size="20px"
                  data-weight="regular"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
                  </svg>
                </div>
                <input
                  placeholder="Enter your email address"
                  //className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#346534] bg-[#1a321a] focus:border-[#346534] h-full placeholder:text-[#93c893] px-[15px] rounded-r-none border-r-0 pr-2 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal"
                  className="form-input flex w-full min-w-0 flex-1 resize-none rounded-r-none border-r-0 pr-2 rounded-l-none  overflow-hidden text-white focus:outline-0 focus:ring-0 border border-[#346534] bg-[#1a321a] focus:border-[#346534] h-full placeholder:text-[#93c893] px-[15px] border-l-0 pl-2 text-sm font-normal leading-normal"
                />
                <div className="flex items-center justify-center rounded-r-xl border-l-0 border border-[#346534] bg-[#1a321a] pr-[7px]"> 
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center rounded-xl h-10 px-4 bg-[#19e619] text-[#112211] text-sm font-bold leading-normal tracking-[0.015em]">
                    <span className="truncate">Sign up</span>
                  </button>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
      {/* Featured Matches Section */}
      {loading ? (
          <p className="text-white text-sm font-normal">Loading matches...</p>
        ) : (
          <FeaturedMatches matches={matches} />
        )}

    </div>
  </div>
    // <div className="home-container">
    //   <h2>Welcome to the Ticketing App</h2>
    //   <p>Find and buy tickets easily!</p>
    // </div>

  );
}
export default Home;