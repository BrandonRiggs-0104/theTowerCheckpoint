import { Schema } from "mongoose";


export const TowerEvents = new Schema({
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  name: { type: String, required: true, maxLength: 75, minLength: 5 },
  description: { type: String, required: true, maxLength: 100, minLength: 5 },
  coverImg: { type: String, required: true, maxLength: 250, minLength: 5 },
  location: { type: String, required: true },
  capacity: { type: Number, required: true },
  startDate: { type: Date, required: true },
  isCanceled: { type: Boolean, default: false },
  type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'] }
})