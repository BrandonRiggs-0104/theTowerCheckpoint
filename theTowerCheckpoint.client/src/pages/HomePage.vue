

<template>
  <div v-for="e in events" :key="e.id">
    <EventCards :eventProp="e"/>
  </div>
</template>

<script>
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import {eventsService} from "../services/EventsService.js"
import { computed, onMounted } from "vue";
import { AppState } from "../AppState.js";


export default {
  setup() {
    async function getEvents() {
      try {
        await eventsService.getEvents()
      } catch (error) {
        logger.error(error);
        Pop.error(error.message)
      }
    }
    onMounted(()=> {
      getEvents()
    })
    return {
      events: computed(()=> AppState.events)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
