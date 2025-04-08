import { Stadium } from "./stadium";
import { Team } from "./team";

export interface Match {
  id: number
  image: string;
  title: string;
  location: string;
  awayTeam: Team;
  homeTeam: Team;
  stadium: Stadium;
  soldTickets: number;
}