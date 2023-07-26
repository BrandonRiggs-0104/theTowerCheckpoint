import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { towerEventsService } from "../services/TowerEventService.js";



export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getTowerEvents)
      .get('/:towerEventById', this.getTowerEventsById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTowerEvents)
      .put('/:eventId', this.editTowerEvent)
      .delete('/:eventId', this.removeTowerEvent)
  }

  async createTowerEvents(req, res, next) {
    try {
      const towerEventData = req.body
      towerEventData.creatorId = req.userInfo.id
      const towerEvent = await towerEventsService.createTowerEvents(towerEventData)

      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }

  async getTowerEvents(req, res, next) {
    try {
      const towerEvents = await towerEventsService.getTowerEvents()

      return res.send(towerEvents)
    } catch (error) {
      next(error)
    }
  }

  async getTowerEventsById(req, res, next) {
    try {
      const towerEventById = req.params.towerEventById
      const towerEvent = await towerEventsService.getTowerEventsById(towerEventById)
      return res.send(towerEvent)

    } catch (error) {
      next(error)
    }
  }

  async editTowerEvent(req, res, next) {
    try {
      const eventId = req.params.eventId
      const userId = req.userInfo.id
      const towerEventData = req.body
      const editedTowerEvent = await towerEventsService.editTowerEvent(eventId, userId, towerEventData)
      res.send(editedTowerEvent)

    } catch (error) {
      next(error)
    }
  }
  async removeTowerEvent(req, res, next) {
    try {
      const eventId = req.params.eventId
      const userId = req.userInfo.id
      await towerEventsService.removeTowerEvent(eventId, userId)


    } catch (error) {
      next(error)
    }
    res.send('Event was deleted.')
  }
}