

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="bg-secondary d-flex justify-content-around p-2">
        <button class="btn btn-outline bg-dark" @click="filterBy = 'concert'">Concerts</button>
        <button class="btn btn-outline bg-dark" @click="filterBy = 'convention'">Conventions</button>
        <button class="btn btn-outline bg-dark" @click="filterBy = 'sport'">Sporting Events</button>
        <button class="btn btn-outline bg-dark" @click="filterBy = 'digital'">Digital Events</button>
      </div>
      <div class="col-md-4 my-3" v-for="e in events" :key="e.id">
        <EventCards :eventProp="e" />
      </div>
      <div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { eventsService } from "../services/EventsService.js"
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
    onMounted(() => {
      getEvents()
    })
    return {
      events: computed(() => AppState.events)
    }
  }
}
</script>

<style scoped lang="scss"></style>
