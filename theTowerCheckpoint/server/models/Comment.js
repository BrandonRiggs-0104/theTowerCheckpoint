import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId

export const CommentSchema = new Schema({
  body: {type: String, required: true, maxLength: 750},
  isAttending: {type: Boolean, required: true, default: false},
  creatorId: {type: ObjectId, required:true},
  eventId: {type: ObjectId, required: true}
}, { timestamps: true, toJSON: {virtuals: true}
})

CommentSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})

CommentSchema.virtual('towerEvents', {
  localField: 'eventId',
  foreignField: '_id',
  ref: 'eventId',
  justOne: true
})