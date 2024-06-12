import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  body: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  PostMessage: {
    type: Schema.Types.ObjectId,
    ref: "PostMessage",
  },
  commentDate: { type: Date, default: Date.now },
  likes: {
    type: [String],
    default: [],
  },
});

const postSchema = new Schema({
  title: String,
  message: String,
  // creator: String,
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
 
  comments: [commentSchema],
  createdAt: { type: Date, default: Date.now },
});


const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
