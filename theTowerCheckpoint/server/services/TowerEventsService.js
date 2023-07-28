import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TowerEventsService {
  async archiveTowerEvent(towerEventsId, userId) {
    const towerEvents = await this.findEventsById(towerEventsId)
    if (towerEvents.creatorId != userId) {
      throw new BadRequest('not yours to cancel...')
    }

    if (towerEvents.isCanceled == true) {
      throw new BadRequest('no no no')
    }
    towerEvents.isCanceled = !towerEvents.isCanceled
    await towerEvents.save()
    return towerEvents
  }
  async findEventsById(eventId) {
    const towerEvents = await dbContext.TowerEvents.findById(eventId).populate('creator ticketCount')
    if (!towerEvents) throw new BadRequest(`TowerEvents at id: ${eventId} could not be found`)
    return towerEvents
  }
  async create(towerEventsData) {
    const towerEvents = await dbContext.TowerEvents.create(towerEventsData)
    await towerEvents.populate('creator ticketCount')
    return towerEvents
  }

  async findAllTowerEvents() {
    const towerEvents = await dbContext.TowerEvents.find().populate('creator ticketCount')
    return towerEvents
  }

  async editEvent(towerEventsData, towerEventsId, userId) {
    const originalEvent = await this.findEventsById(towerEventsId)
    if (originalEvent.creatorId != userId) {
      throw new Forbidden(`boooyyy that ain't yo event at ${towerEventsId}.`)
    }
    
    if (originalEvent.isCanceled == true) {
      throw new BadRequest('no no no')
    }
    originalEvent.type = towerEventsData.type || originalEvent.type
    originalEvent.name = towerEventsData.name || originalEvent.name
    originalEvent.description = towerEventsData.description || originalEvent.description
    originalEvent.coverImg = towerEventsData.coverImg || originalEvent.coverImg
    originalEvent.location = towerEventsData.location || originalEvent.location
    originalEvent.capacity = towerEventsData.capacity || originalEvent.capacity
    originalEvent.startDate = towerEventsData.startDate || originalEvent.startDate
    await originalEvent.save()
    return originalEvent
  }
}

export const towerEventsService = new TowerEventsService()