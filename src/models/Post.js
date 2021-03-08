import { Schema, model } from 'mongoose';

const Post = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default model('Post', Post);
