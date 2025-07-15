import { User, Event, UserInterests } from '../types';

// Simulate local database using localStorage
class LocalDatabase {
  private users: User[] = [];
  private events: Event[] = [];

  constructor() {
    this.loadData();
  }

  private loadData() {
    const users = localStorage.getItem('calendar_users');
    const events = localStorage.getItem('calendar_events');
    
    if (users) {
      this.users = JSON.parse(users);
    } else {
      // Create default admin user
      this.users = [{
        id: 'admin-001',
        email: 'admin@example.com',
        isAdmin: true,
        hasCompletedSegmentation: true,
        createdAt: new Date().toISOString()
      }];
      this.saveUsers();
    }

    if (events) {
      this.events = JSON.parse(events);
    } else {
      // Create sample events
      this.events = [
        {
          id: 'event-001',
          title: 'Product Launch Webinar',
          description: 'Join us for the launch of our latest product innovation',
          date: new Date().toISOString().split('T')[0],
          time: '14:00',
          createdBy: 'admin-001',
          createdAt: new Date().toISOString()
        },
        {
          id: 'event-002',
          title: 'Tech Conference 2025',
          description: 'Annual technology conference with industry leaders',
          date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
          time: '09:00',
          createdBy: 'admin-001',
          createdAt: new Date().toISOString()
        }
      ];
      this.saveEvents();
    }
  }

  private saveUsers() {
    localStorage.setItem('calendar_users', JSON.stringify(this.users));
  }

  private saveEvents() {
    localStorage.setItem('calendar_events', JSON.stringify(this.events));
  }

  // User methods
  async createUser(email: string, isAdmin: boolean = false): Promise<User> {
    const user: User = {
      id: `user-${Date.now()}`,
      email,
      isAdmin,
      hasCompletedSegmentation: false,
      createdAt: new Date().toISOString()
    };
    
    this.users.push(user);
    this.saveUsers();
    return user;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.users.find(u => u.email === email) || null;
  }

  async updateUserInterests(userId: string, interests: UserInterests): Promise<void> {
    const userIndex = this.users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      this.users[userIndex].interests = interests;
      this.users[userIndex].hasCompletedSegmentation = true;
      this.saveUsers();
    }
  }

  // Event methods
  async createEvent(event: Omit<Event, 'id' | 'createdAt'>): Promise<Event> {
    const newEvent: Event = {
      ...event,
      id: `event-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    
    this.events.push(newEvent);
    this.saveEvents();
    return newEvent;
  }

  async getEvents(): Promise<Event[]> {
    return this.events;
  }

  async getEventsByDate(date: string): Promise<Event[]> {
    return this.events.filter(e => e.date === date);
  }

  async updateEvent(id: string, updates: Partial<Event>): Promise<void> {
    const eventIndex = this.events.findIndex(e => e.id === id);
    if (eventIndex !== -1) {
      this.events[eventIndex] = { ...this.events[eventIndex], ...updates };
      this.saveEvents();
    }
  }

  async deleteEvent(id: string): Promise<void> {
    this.events = this.events.filter(e => e.id !== id);
    this.saveEvents();
  }
}

export const database = new LocalDatabase();