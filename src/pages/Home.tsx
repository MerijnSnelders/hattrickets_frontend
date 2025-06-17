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
        console.log("API Matches:", data);
        setMatches(data);
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