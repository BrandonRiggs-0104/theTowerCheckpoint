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

  async getEventById(eventId) {
    const res = await api.get(`api/events/${eventId}`)
    logger.log('got event by Id', res.data)
    const event = new Event(res.data)
    AppState.activeEvent = event
  }

  async createEvent(eventData) {
    const res = await api.post('api/events', eventData)
    logger.log(res.data)
    const event = new Event(res.data)
    return event
  }
}
export const eventsService = new EventsService()