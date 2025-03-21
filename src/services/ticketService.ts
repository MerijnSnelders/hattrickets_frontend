import axios from "axios";
import { TicketPurchase } from "../types/ticket";

const API_URL = "http://localhost:8080/tickets/buy"; 
export const buyTicket = async (ticket: TicketPurchase): Promise<String> => {
  try {
    await axios.post(API_URL, ticket);
    return "Ticket purchased successfully";
  } 
  catch (error) {
    throw new Error((error as Error).message);
  }
};