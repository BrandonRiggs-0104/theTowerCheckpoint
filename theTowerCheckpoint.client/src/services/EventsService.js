import { AppState } from "../AppState.js"
import { Event } from "../models/Event.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class EventsService {
  async getEvents() {
    const res = await api.get('api/events')
    logger.log('getting events', res.data)
    const events = res.data.map(eventPojo => new Event(eventPojo))
    AppState.events = events
  }
}
export const eventsService = new EventsService()