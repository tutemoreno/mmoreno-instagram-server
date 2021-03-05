import { Schema, model } from "mongoose";

export default model(
  "Post",
  new Schema({
    name: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
      unique: true,
    },
    videoCodec: {
      type: String,
      required: true,
    },
    audioCodec: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
  })
);