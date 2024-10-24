const { model, Schema, SchemaType } = require("mongoose");

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 100,
    },
    content: {
      type: String,
      required: true,
      minLength: 3,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const productModel = model("Product", productSchema);

module.exports = productModel;