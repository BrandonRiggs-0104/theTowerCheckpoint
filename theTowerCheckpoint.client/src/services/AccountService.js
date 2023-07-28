import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
import { logger } from "../utils/Logger.js"
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = new Account(res.data)
    } catch (error) {
      logger.error('have you started your server yet?')
    }
  }
  async getAccountTickets() {
    const res = await api.get('/account/tickets')
    logger.log('getting my tickets', res.data)
    AppState.accountTickets = res.data
  }
}

export const accountService = new AccountService()
