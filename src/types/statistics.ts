import { Match } from "./match";

export interface statisticsResponse {
  popularMatch: Match;
  totalRevenue: number;
  averageTicketsPerStadium: number;
}