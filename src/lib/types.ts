export interface Trip {
  id: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  heroImage: string;
  participants: Participant[];
  itinerary: DayPlan[];
  polls: Poll[];
  preferences: GroupPreferences;
  actionItems: ActionItem[];
}

export interface Participant {
  id: string;
  name: string;
  avatar: string;
  role: "organizer" | "member";
}

export interface DayPlan {
  date: string;
  dayNumber: number;
  venues: Venue[];
}

export interface Venue {
  id: string;
  name: string;
  type: "restaurant" | "activity" | "hotel" | "transport" | "sight";
  time: string;
  endTime?: string;
  description: string;
  address: string;
  imageUrl?: string;
  lat: number;
  lng: number;
  rating?: number;
  priceLevel?: number;
  notes?: string;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  status: "active" | "closed";
  totalVotes: number;
  createdAt: string;
  closesAt?: string;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
  voters: string[];
  imageUrl?: string;
}

export interface GroupPreferences {
  pace: number;
  budget: number;
  adventure: number;
  culture: number;
  food: number;
  nightlife: number;
}

export interface ActionItem {
  id: string;
  text: string;
  assignee?: string;
  completed: boolean;
}

export interface DashboardResponse {
  trip: Trip;
  participantId: string;
  participantName: string;
}
