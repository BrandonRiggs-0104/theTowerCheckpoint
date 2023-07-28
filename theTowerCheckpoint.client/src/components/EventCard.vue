<template>
  <div class="m-3 elevation-5 rounded selectable card" @click="goTo" :title="event.name">
    <div class="card m-3">
      <img class="img-fluid rounded" :src="event.coverImg" alt="Event Image">
      <h3 class="text-center">{{ event.name }}</h3>
      <p class="fw-25 text-center my-3">{{ event.location }}
      </p>
      <div class="text-center my-3">
        {{ event.type }}
      </div>
    </div>
  </div>
</template>

<script>
import { router } from '../router'
export default {
  props: { event: { type: Object, required: true } },
  setup(props) {
    return {
      goTo() {
        router.push({ name: 'EventDetails', params: { eventId: props.event.id } })
      }
    }
  },
}
</script>

<style scoped lang="scss">
img {
  height: 100%;
  width: 100%;
}
</style>