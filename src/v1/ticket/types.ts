export interface GetTicketsByStatusParams {
  status: string;
}

export interface GetTicketsDetailParams {
  ticketId: string;
}

interface UserDetails {
  name: string;
  email: string;
  mobile: string;
}

export interface PostBookTicketBody {
  bus_id: number;
  seat_number: number;
  user_details: UserDetails;
}

export interface PutBookTicketBody {
  ticket_id: number;
  is_open: boolean;
  user_details: UserDetails;
}
