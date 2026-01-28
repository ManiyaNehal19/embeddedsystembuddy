import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMessage {
  role: "user" | "assistant";
  content: string;
}

export interface IThread extends Document {
  thread_id: string;
  thread_name: string;
  messages: IMessage[];
  userId: string; // added userId
}

const MessageSchema = new Schema<IMessage>({
  role: {
    type: String,
    enum: ["user", "assistant"],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const ThreadSchema = new Schema<IThread>(
  {
    thread_id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    thread_name: {
      type: String,
      required: true,
    },
    messages: {
      type: [MessageSchema],
      default: [],
    },
    userId: {
      type: String,
      required: true,
      index: true,
    },
  },
);

const Thread: Model<IThread> =
  mongoose.models.Thread || mongoose.model<IThread>("Thread", ThreadSchema);

export default Thread;
