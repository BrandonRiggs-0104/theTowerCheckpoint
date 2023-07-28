import { Auth0Provider } from "@bcwdev/auth0provider";
import { towerEventsService } from "../services/TowerEventsService.js";
import BaseController from "../utils/BaseController.js"
import { ticketsService } from "../services/TicketsService.js";
import { dbContext } from "../db/DbContext.js";
import { commentsService } from "../services/CommentsService.js";


export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.findAllEvents)
      .get('/:id', this.FindEventsById)
      // .get('', this.getAllComments)
      .get('/:eventId/comments', this.getCommentsByEventId)
      .get('/:eventId/tickets', this.getTicketsByAccountId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .delete('/:eventId', this.archiveTowerEvent)
      .post('', this.create)
      .put('/:eventId', this.editEvent)

  }
  async editEvent(req, res, next) {
    try {
      const towerEventsData = req.body
      const towerEventsId = req.params.eventId
      const userId = req.userInfo.id
      const editedEvent = await towerEventsService.editEvent(towerEventsData, towerEventsId, userId)
      return res.send(editedEvent)
    } catch (error) {
      next(error)
    }
  }
  async getMyTickets(req, res, next) {
    try {
      const tickets = await ticketsService.getMyTickets(req.params.eventId)
      return res.send(tickets)
    } catch (error) {
      next(error)
    }
  }
  async FindEventsById(req, res, next) {
    try {
      const towerEvents = await towerEventsService.findEventsById(req.params.id)
      return res.send(towerEvents)
    } catch (error) {
      next(error)
    }
  }
  async findAllEvents(req, res, next) {
    try {
      const towerEvents = await towerEventsService.findAllTowerEvents()
      return res.send(towerEvents)
    } catch (error) {
      next(error)
    }
  }

  async getTicketsByAccountId(req, res, next) {
    try {
      const eventId = req.params.eventId
      const tickets = await ticketsService.getTicketsByAccountId(eventId)
      return res.send(tickets)
    } catch (error) {
      next(error)
    }
  }

  async archiveTowerEvent(req, res, next) {
    try {
      const towerEvents = await towerEventsService.archiveTowerEvent(req.params.eventId, req.userInfo.id)
      return res.send(towerEvents)
    } catch (error) {
      next(error)
    }
  }
  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const towerEvents = await towerEventsService.create(req.body)
      return res.send(towerEvents)
    } catch (error) {
      next(error)
    }
  }

  async getCommentsByEventId(req, res, next) {
    try {
      const comments = await commentsService.getAllComments({ eventId: req.params.eventId })
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }
}