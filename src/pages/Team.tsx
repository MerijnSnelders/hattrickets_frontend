import { searchTeams } from "../services/teamService";
import { Team } from "../types/team";
import TeamCard from "../components/teamCard";
import SearchPage from "../components/SearchPage";

const TeamPage = () => {
  return (
    <SearchPage<Team>
      title="Search a team"
      placeholder="Type the name of a team..."
      fetchData={searchTeams}
      renderItem={(team) => <TeamCard key={team.id} team={team} />}
    />
  );
};

export default TeamPage;
