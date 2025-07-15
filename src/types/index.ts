export interface User {
  id: string;
  email: string;
  isAdmin: boolean;
  hasCompletedSegmentation: boolean;
  interests?: UserInterests;
  createdAt: string;
}

export interface UserInterests {
  eventTypes: string[];
  updateFrequency: string;
  industries: string[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  createdBy: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}