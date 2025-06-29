import { NextResponse } from 'next/server'; 
import connectToDB from '@/lib/db';
import Post from '@/models/Post';

export async function GET() {
  try {
    await connectToDB();
    const posts = await Post.find().sort({ createdAt: -1 });
    return NextResponse.json(posts);
  } catch (error) {
    console.error('❌ Error in GET /api/posts:', error);  // ✅ Add this line for debugging
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
