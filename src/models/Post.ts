import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
  title: string;
  content: string;
  slug: string;
  imageUrl?: string; 
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true }, // Rich text HTML
    slug: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: false },
  },
  { timestamps: true }
);

// Prevent re-declaring model in dev mode
const Post = mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);

export default Post;
