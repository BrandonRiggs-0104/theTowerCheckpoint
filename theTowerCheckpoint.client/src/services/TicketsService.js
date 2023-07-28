import { AppState } from "../AppState"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService"


class TicketsService {
  async create(newTicket) {
    const res = await api.post('api/tickets', newTicket)
    AppState.ticketProfiles.push(res.data)
  }
  async getTicketProfiles(eventId) {
    const res = await api.get(`api/events/${eventId}/tickets`)
    AppState.ticketProfiles = res.data
  }
  async sellTicket(ticketId) {
    const res = await api.delete('api/tickets/' + ticketId)
    AppState.ticketProfiles = AppState.ticketProfiles.filter(t => t.id != ticketId)
    logger.log('the tickets in the appstate', AppState.ticketProfiles)
  }
  async getTicketsByAccount() {
    const res = await api.get('account/tickets')
    AppState.accountTickets = res.data
  }
}

export const ticketsService = new TicketsService()