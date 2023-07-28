import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class EventsService{
  async getAll(){
    const res = await api.get('api/events')
    AppState.events = res.data
  }

  async getById(id){
    const res = await api.get('api/events/'+id)
    AppState.activeEvent = res.data
  }

  async createEvent(newEvent){
    const res = await api.post('api/events', newEvent)
    AppState.events.unshift(res.data)
    return res.data
  }
  async cancelEvent(eventId){
    const res = await api.delete('api/events/'+eventId)
    return res.data
  }
}

export const eventsService = new EventsService()