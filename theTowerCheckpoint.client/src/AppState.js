import { reactive } from 'vue'
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  events: {},
  activeEvent: {},
  comments: [],
  ticketProfiles: [],
  accountTickets: []
})
