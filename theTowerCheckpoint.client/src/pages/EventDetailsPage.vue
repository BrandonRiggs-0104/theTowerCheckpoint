<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12">
        <h1 class="text-center">{{ event.name }}</h1>
      </div>
      <div class="col-12 col-md-6">
        <EventDetailsCard />
      </div>
      <div class="col-12 col-md-6">
        <Comments :comment="c" />
      </div>
      <div class="col-8 my-2">
        <TicketHolders :ticketProfiles="t" />
      </div>
    </section>
  </div>
</template>

<script>
import { eventsService } from '../services/EventsService'
import { commentsService } from '../services/CommentsService'
import { ticketsService } from '../services/TicketsService'
// import { logger } from '../utils/Logger'
import Pop from '../utils/Pop';
import { computed, onMounted, ref } from 'vue'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import EventDetailsCard from '../components/EventDetailsCard.vue';
import Comments from '../components/Comments.vue'
import TicketHolders from '../components/TicketHolders.vue'
export default {
  setup() {
    const editable = ref({})
    const route = useRoute()
    async function getEventById() {
      try {
        await eventsService.getById(route.params.eventId);
      }
      catch (error) {
        Pop.error(error)
      }
    }
    async function getCommentsByEventId() {
      try {
        await commentsService.getCommentsByEventId(route.params.eventId)
      }
      catch (error) {
        Pop.error(error)
      }
    }
    async function getTicketProfiles() {
      try {
        await ticketsService.getTicketProfiles(route.params.eventId)
      }
      catch (error) {
        Pop.error(error)
      }
    }
    onMounted(() => {
      getEventById()
      getCommentsByEventId()
      getTicketProfiles()
    })
    return {
      editable,
      event: computed(() => AppState.activeEvent),
      comments: computed(() => AppState.comments),
    }
  },
  components: { EventDetailsCard, Comments, TicketHolders }
}
</script>

<style scoped></style>