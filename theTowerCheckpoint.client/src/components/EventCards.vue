

<template>
  <div class="d-flex row col-9 justify-content-center m-3 bg-dark rounded text-center">
    <div class="col-8 col-md-12 m-4">
   <img class="img-fluid rounded" :src="eventProp.coverImg" :alt="eventProp.name">
    <h3 class="m-3">{{ eventProp.name }}</h3>
    <p>{{ eventProp.description }}</p>
    <div>
      <div>Tickets Total: </div>
      <div>Tickets Remaining: </div>
    </div>
   </div>
   <button class="col-3 bg-success">RESERVE</button>
  </div>
</template>


<script>
export default {
  props: {
eventProp: {type: Object, required: true}
  },
  setup(){
    return {}
  }
}
</script>


<style lang="scss" scoped>

</style>