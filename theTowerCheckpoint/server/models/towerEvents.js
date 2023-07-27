import { Schema } from "mongoose";


export const TowerEventsSchema = new Schema({
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  name: { type: String, required: true, maxLength: 75, minLength: 2 },
  description: { type: String, required: true, minLength: 5 },
  coverImg: { type: String, required: true, maxLength: 300, minLength: 5 },
  location: { type: String, required: true },
  capacity: { type: Number, required: true },
  startDate: { type: Date, required: true },
  isCanceled: { type: Boolean, default: false },
  type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'] }
}, { timestamps: true, toJSON: { virtuals: true } })


TowerEventsSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

TowerEventsSchema.virtual('ticketCount', {
  localField: '_id',
  foreignField: 'eventId',
  count: true,
  ref: 'Ticket'
})