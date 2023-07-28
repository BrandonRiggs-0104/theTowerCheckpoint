<template>
  <div class="mt-3 elevation-5 rounded selectable card" @click="goTo" :title="accountTicket.event.name">
    <div class="card">
      <img class="img-fluid" :src="accountTicket.event.coverImg" alt="Event Image">
      <h4 class="text-center mt-3">{{ accountTicket.event.name }}</h4>
    </div>
  </div>
</template>

<script>
import { router } from '../router'
// import { ticketsService } from "../services/TicketsService.js"
// import { commentsService } from "../services/CommentsService.js"
// import { logger } from "../utils/Logger.js"
export default {
  props: { accountTicket: { type: Object, required: true } },
  setup(props) {
    return {
      goTo() {
        router.push({ name: 'EventDetails', params: { eventId: props.accountTicket.event.id } })
      }
    }
  }
}
</script>

<style scoped lang = "scss" ></style >
