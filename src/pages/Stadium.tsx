import { searchStadium } from "../services/stadiumService";
import { Stadium } from "../types/stadium";
import StadiumCard from "../components/stadiumCard";
import SearchPage from "../components/SearchPage";

const StadiumPage = () => {
  return (
    <SearchPage<Stadium>
      title="Search a stadium"
      placeholder="Type the name of a stadium..."
      fetchData={searchStadium}
      renderItem={(stadium) => <StadiumCard key={stadium.id} stadium={stadium} />}
    />
  );
};

export default StadiumPage;
