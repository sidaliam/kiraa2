import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    télephone: {
      type: String,
      required: true,
    },

    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    modéle: {
      type: String,
      required: true,
    },
    unavailable: { type: [Date] },
    reponse: {
      type: Boolean,
      default: false,
    },
    totale: {
      type: Number,
      default: 0,
    },
    idroomnumber: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
