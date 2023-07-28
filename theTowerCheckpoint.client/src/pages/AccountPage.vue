<template>
  <div class="about text-center">
    <h1 class="m-3">Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12">
        <h2>My Event Tickets</h2>
      </div>
    </section>
    <section class="row">
      <div class="col-md-4" v-for="t in accountTickets" :key="t.id">
        <TicketCard :accountTicket="t" />
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService'
// import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
export default {
  name: 'Account',
  setup() {
    async function getAccountTickets() {
      try {
        await accountService.getAccountTickets()
      } catch (error) {
        Pop.error(error)
      }
    }
    onMounted(() => {
      getAccountTickets()
    })
    return {
      account: computed(() => AppState.account),
      accountTickets: computed(() => AppState.accountTickets)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 95px;
}
</style>
