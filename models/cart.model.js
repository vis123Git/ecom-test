const { Schema, model, Types } = require("mongoose");

/**********cart schema**********/
const cartSchema = new Schema(
  {
    user_id: {
      type: Types.ObjectId,
      ref: "user",
      required: true,
    },

    product_id: {
      type: Types.ObjectId,
      ref: "product",
      required: true,
    },
    amount: {
      type: Number,
    },

    quantity: {
      type: Number,
    },
    payment_status: {
      type: String,
      enum: {
        values: ["PENDING", "PAID", "FAILED"],
        message: "{VALUE} user_role is not supported!",
      },
      default: "PENDING",
    },
    status: {
      type: String,
      enum: {
        values: ["ACTIVE", "INACTIVE"],
        message: "{VALUE} user_role is not supported!",
      },
      default: "ACTIVE",
    },
  },
  { timestamps: true }
);

const Cart = model("cart", cartSchema);
module.exports = Cart;
