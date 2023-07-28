<template>
  <div class="card elevation-5 p-3">
    <div v-if="event.creatorId == account.id" class="text-center">
      <button @click="cancelEvent" class="btn btn-warning mb-3" title="Cancel Event">Cancel Event</button>
    </div>
    <img class="img-fluid elevation-5 rounded" :src="event.coverImg" alt="event image">
    <p class="text-center mt-2">{{ event.location }} - Tickets Left: {{ event.capacity -
      event.ticketCount }}</p>
    <p class="text-center">{{ event.type }} | {{ new Date(event.startDate).toLocaleDateString() }}</p>
    <p>{{ event.description }}</p>
    <div v-if="!event.isCanceled && event.capacity >= 1" class="card p-3">

      <div v-if="!hasTicket && event.ticketCount != event.capacity" class="text-center">
        <button class="btn btn-primary" @click="buyTicket" title="Buy Ticket">Buy Ticket</button>
      </div>

      <div v-else class="text-center">
        <button v-if="hasTicket" class="btn btn-danger" @click="sellTicket" title="Sell Ticket">Sell
          Ticket</button>
      </div>

    </div>
    <!-- <div v-if="event.isCanceled" class="card">
      <img class="img-fluid elevation-5 rounded" :src="event.coverImg" alt="event image">
      <p class="text-center mt-2 text-decoration-line-through">{{ event.location }} - Tickets Left: {{ event.capacity }}
      </p>
      <p class="text-center text-decoration-line-through">{{ event.type }} | {{ new
        Date(event.startDate).toLocaleDateString('en-US', {
          month: 'short', day: 'numeric'
        }) }}</p>
      <p class="text-decoration-line-through">{{ event.description }}</p> -->
    <p class="text-center" v-if="event.isCanceled"><strong class="text-danger">Canceled</strong></p>
  </div>
  <div v-if="event.ticketCount == event.capacity" class="card">
    <p class="text-center"><strong class="text-danger">Sold Out</strong></p>
  </div>
  <!-- </div> -->
</template>
  
<script>
import { computed } from 'vue'
// import { logger } from '../utils/Logger';
import { AppState } from '../AppState'
import { eventsService } from '../services/EventsService'
import { ticketsService } from '../services/TicketsService'
import Pop from '../utils/Pop'
export default {
  setup() {
    return {
      account: computed(() => AppState.account),
      event: computed(() => AppState.activeEvent),
      hasTicket: computed(() => {
        if (AppState.ticketProfiles.find(t => t.accountId == AppState.account.id)) {
          return true
        }
        return false
      }),
      async buyTicket() {
        try {
          if (!AppState.account.id) {
            throw new Error('Did you log in?')
          }
          let newTicket = {
            eventId: AppState.activeEvent.id,
            accountId: AppState.account.id
          }
          await ticketsService.create(newTicket)
          AppState.activeEvent.capacity--
          Pop.success('Enjoy!')
        }
        catch (error) {
          Pop.error(error)
        }
      },
      async sellTicket() {
        try {
          let ticketsToSell = AppState.ticketProfiles.find(t => t.accountId == AppState.account.id)
          await ticketsService.sellTicket(ticketsToSell.id)
          AppState.activeEvent.capacity++
          Pop.success('Ticket has been sold.')
        }
        catch (error) {
          Pop.error(error)
        }
      },
      async cancelEvent() {
        try {
          let event = AppState.activeEvent
          await eventsService.cancelEvent(event.id)
          AppState.activeEvent.isCanceled = true
          Pop.success('Event Canceled.')
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  },
}
</script>
  
<style scoped lang="scss"></style>