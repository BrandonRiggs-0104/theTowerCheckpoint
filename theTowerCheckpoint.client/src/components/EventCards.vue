

<template>
<router-link :to ="{ name: 'Events', params: {eventId: eventProp.id}}">
  <div class="row justify-content-center m-3 bg-dark rounded text-center cards">
    <div class="">
   <img class="img-fluid" :src="eventProp.coverImg" :alt="eventProp.name">
    <h3 >{{ eventProp.name }}</h3>
    <p>{{ eventProp.location}}
    {{ eventProp.startDate.toLocaleDateString() }}</p>
    <!-- <p>{{ eventProp.description }}</p> -->
    <!-- <p class="fs-5">Type of Event: {{ eventProp.type }}</p> -->
    <div>
      <div>Total Capacity: {{ eventProp.capacity }}</div>
      <!-- <div>Remaining Availability: {{  }}</div> -->
    </div>
   </div>
   <!-- <button class="col-4 bg-success">Reserve</button>
   <button class="col-4 bg-success">Comment</button> -->
  </div>
</router-link>
</template>


<script>


export default {
  props: {
eventProp: {type: Object, required: true},
// ticketProp: {type: Object, required: true}
  },
  setup(){
    return {}
  }
}
</script>


<style lang="scss" scoped>
.cards{
height: 100%;
}
</style>