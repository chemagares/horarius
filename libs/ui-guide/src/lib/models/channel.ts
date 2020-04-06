import { Event } from './channel-event';

export interface Channel {
  id: string;
  title: string;
  items: Array<Event>;
}
