import { Schema } from "mongoose";

export const TicketSchema = new Schema({
  eventId: { type: Schema.Types.ObjectId, required: true },
  accountId: { type: Schema.Types.ObjectId, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })