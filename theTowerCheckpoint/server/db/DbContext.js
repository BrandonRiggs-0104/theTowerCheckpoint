import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { TowerEventsSchema } from "../models/TowerEvents.js";
import { TicketSchema } from "../models/Ticket.js";
import { TicketHolderSchema } from "../models/TicketHolders.js";
import { CommentSchema } from "../models/Comment.js";

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  TowerEvents = mongoose.model('TowerEvent', TowerEventsSchema);

  Tickets = mongoose.model('Ticket', TicketSchema)

  TicketHolders = mongoose.model('TicketHolder', TicketHolderSchema)

  Comments = mongoose.model('Comment', CommentSchema)
}

export const dbContext = new DbContext()
