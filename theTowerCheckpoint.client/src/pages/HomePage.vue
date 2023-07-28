<template>
  <section class="row justify-content-center col-12">
    <div class="">
      <div class="d-flex justify-content-around p-3">
        <button class="btn btn-outline-light mdi mdi-music bg-dark" @click="filterBy = 'concert'"> Concerts!</button>

        <button class="btn btn-outline-light mdi mdi-alien bg-dark" @click="filterBy = 'convention'">
          Conventions!</button>

        <button class="btn btn-outline-light mdi mdi-football bg-dark" @click="filterBy = 'sport'"> Sporting
          Events!</button>

        <button class="btn btn-outline-light mdi mdi-controller bg-dark" @click="filterBy = 'digital'"> Digital</button>


      </div>
    </div>
  </section>
  <div class="container-fluid">
    <section class="row">
      <div class="col-md-4" v-for="e in events" :key="e.id">
        <EventCard :event="e" />
      </div>
    </section>
  </div>
</template>

<script>
import Pop from '../utils/Pop'
import { eventsService } from '../services/EventsService.js'
import { onMounted, ref } from 'vue'
import { computed } from 'vue'
import { AppState } from '../AppState'
import EventCard from '../components/EventCard.vue'
export default {
  name: "Home",
  setup() {
    const filterBy = ref('')
    async function getEvents() {
      try {
        await eventsService.getAll()
      }
      catch (error) {
        Pop.error(error)
      }
    }
    onMounted(() => {
      getEvents()
    })
    return {
      filterBy,
      events: computed(() => {
        if (filterBy.value == "") {
          return AppState.events
        } else {
          return AppState.events.filter(e => filterBy.value ? e.type == filterBy.value : true)
        }
      })
    }
  },
  components: { EventCard }
}
</script>

<style scoped lang="scss"></style>