import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { TowerEventsSchema } from "../models/TowerEvents.js";



class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  towerEvents = mongoose.model('TowerEvents', TowerEventsSchema)
}

export const dbContext = new DbContext()
