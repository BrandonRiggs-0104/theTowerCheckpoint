import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";

class TicketsService {
  async getMyTickets(accountId) {
    let tickets = await dbContext.Tickets.find({ accountId }).populate('event')
    return tickets
  }

  async getAllTickets(eventId) {
    const tickets = await dbContext.Tickets.find({ eventId }).populate('profile', 'name picture')
    return tickets
  }

  async createTickets(ticketData) {
    const tickets = await dbContext.Tickets.create(ticketData)
    await tickets.populate('profile event')
    return tickets
  }

  async deleteTicket(ticketId, userId) {
    const ticket = await dbContext.Tickets.findById(ticketId).populate('event profile')
    if (!ticket) throw new BadRequest(`Collaboration at id: ${ticketId} does not exist`)
    if (ticket.accountId != userId) throw new Forbidden ("can't touch this")
    await ticket.remove()
    return `collaboration between ${ticket.accountId} and ${ticket.userId} has ended.`
  }

  async getTicketsByAccountId(eventId) {
    const ticketHolders = await dbContext.Tickets.find({eventId}).populate('event profile')
    return ticketHolders
  }
}


export const ticketsService = new TicketsService()