import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const Post = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
      unique: true,
    },
    likes: [
      {
        ref: 'User',
        type: Schema.Types.ObjectId,
      },
    ],
  },
  { timestamps: true }
);

export default model('Post', Post);
