import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { TowerEventsSchema } from "../models/TowerEvents.js";
import { TicketSchema } from "../models/Tickets.js";



class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  towerEvents = mongoose.model('TowerEvents', TowerEventsSchema)
  tickets = mongoose.model('Ticket', TicketSchema)
}

export const dbContext = new DbContext()
