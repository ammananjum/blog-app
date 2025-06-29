import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';  // make sure this import path is correct
import Post from '@/models/Post';

export async function GET() {
  try {
    console.log('➡️ Connecting to DB...');
    await dbConnect();
    console.log('✅ Connected. Fetching posts...');
    const posts = await Post.find().sort({ createdAt: -1 });
    console.log(`✅ ${posts.length} post(s) found`);
    return NextResponse.json(posts);
  } catch (error) {
    console.error('❌ Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
