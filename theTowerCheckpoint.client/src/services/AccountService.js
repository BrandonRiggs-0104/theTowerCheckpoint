import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
// import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = new Account(res.data)
    } catch (error) {
    }
  }
  async getAccountTickets() {
    const res = await api.get('/account/tickets')
    AppState.accountTickets = res.data
  }
}

export const accountService = new AccountService()
