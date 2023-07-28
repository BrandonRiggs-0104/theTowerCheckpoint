import BaseController from "../utils/BaseController.js";
import { ticketsService } from "../services/TicketsService.js";
import {Auth0Provider} from "@bcwdev/auth0provider"
export class TicketsController extends BaseController {
  constructor() {
    super('api/tickets')
    this.router
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.createTickets)
    .delete('/:ticketId',this.deleteTicket)
  }

  async createTickets(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const ticket = await ticketsService.createTickets(req.body)
      return res.send(ticket)
    } catch (error) {
      next(error)
    }
  }

  async deleteTicket(req, res, next) {
    try {
      const ticket = await ticketsService.deleteTicket(req.params.ticketId, req.userInfo.id)
      return res.send(ticket)
    } catch (error) {
      next(error)
    }
  }

  // async removeComments(req, res, next){
  //   try {
  //     const comment = await commentsService.removeComments(req.params.eventId, req.userInfo.id)
  //     return res.send(comment)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  async getTicketsByEventId(req, res, next){
    try {
      const tickets = await ticketsService.getMyTickets(req.params.id)
      return res.send(tickets)
    } catch (error) {
      next(error)
    }
  }
}