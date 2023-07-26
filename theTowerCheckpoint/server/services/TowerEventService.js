import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"


class TowerEventsService {



  async createTowerEvents(towerEventData) {
    const newTowerEvent = await dbContext.towerEvents.create(towerEventData)
    await newTowerEvent.populate('creator', 'name picture')
    return newTowerEvent
  }

  async getTowerEvents() {
    const towerEvents = await dbContext.towerEvents.find()

    return towerEvents
  }
  async getTowerEventsById(towerEventById) {
    const towerEvent = await dbContext.towerEvents.findById(towerEventById)
      .populate('creator', 'name picture')

    if (!towerEvent) {
      throw new BadRequest('Tower Event: ${towerEventsId} could not be located.')
    }
    return towerEvent
  }
  async editTowerEvent(eventId, userId, towerEventData) {
    const originalEvent = await this.getTowerEventsById(eventId)
    if (originalEvent.creatorId.toString() != userId) {
      throw new BadRequest('Events can only be changed by the original creator.')
    }
    originalEvent.name = towerEventData.name || originalEvent.name
    originalEvent.description = towerEventData.description || originalEvent.description
    await originalEvent.save(towerEventData)
    return originalEvent
  }
  async removeTowerEvent(eventId, userId) {
    const eventToRemove = await this.getTowerEventsById(eventId)
    if (eventToRemove.creatorId.toString() != userId) {
      throw new Forbidden('Only the creator of the event may delete it.')
    }
    await eventToRemove.remove()
  }


}
export const towerEventsService = new TowerEventsService()