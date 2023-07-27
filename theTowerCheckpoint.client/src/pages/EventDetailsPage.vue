<template>
  <div class="container-fluid bg-dark">
    <div class="row justify-content-center">
      <div v-if="event" class="d-flex col-12 m-3 justify-content-center">
        <div class="">
          <img :src="event.coverImg" :alt="event.name" class="cover-img rounded m-3">
        </div>
        <div class="text-center">
          <h2>{{ event.name }}</h2>
          <p class="fs-4">{{ event.location }}
            {{ event.startDate.toLocaleString() }}
          </p>
          <p>
            {{ event.description }}
          </p>
          <div>Total Capacity: {{ event.capacity }}</div>
          <div>Remaining Tickets: {{ }}</div>
          <div>
            <button class="col-3 bg-success m-3">Reserve</button>
            <button class="col-3 bg-success m-3">Comment</button>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid bg-primary my-3">
      <h4>Comments:</h4>
      <div>something</div>
      <div>something</div>
      <div>something</div>
      <div>something</div>
    </div>
  </div>
</template>


<script>
import { useRoute } from "vue-router";
import Pop from "../utils/Pop.js";
import { eventsService } from "../services/EventsService.js";
import { computed, onMounted } from "vue";
import { AppState } from "../AppState.js";

export default {
  setup() {
    const route = useRoute()

    async function getEventById() {
      try {
        const eventId = route.params.eventId
        await eventsService.getEventById(eventId)

      } catch (error) {
        Pop.error(error.message)
      }
    }

    onMounted(() => {
      getEventById()
    })
    return {
      event: computed(() => AppState.activeEvent)
    }
  }
}
</script>


<style lang="scss" scoped>
.cover-img {
  width: 100vh;
}

template {
  background-color: black;
}
</style>