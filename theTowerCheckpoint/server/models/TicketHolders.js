import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId

export const TicketHolderSchema = new Schema ({
  eventId: {type: ObjectId, required: true, ref: 'TowerEvent'},
  accountId: {type: ObjectId, required: true, ref: 'Account'},
  creatorId: {type: ObjectId, required: true, ref: 'Profile'}
}, {timestamps: true, toJSON: {virtuals: true}})

TicketHolderSchema.virtual('event', {
  localField: 'eventId',
  foreignField: '_id',
  ref: 'TowerEvent',
  count: true
})

TicketHolderSchema.virtual('profile', {
  localField: 'accountId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})

// id: ObjectId
// eventId: ObjectId
// accountId: ObjectId
// **profile
// **event