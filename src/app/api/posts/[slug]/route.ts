
import { NextRequest, NextResponse } from 'next/server';
import connectToDB from '@/lib/db';
import Post from '@/models/Post';

// ✅ GET: Fetch a single post
export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  await connectToDB();

  try {
    const post = await Post.findOne({ slug: params.slug });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

// ✅ DELETE: Remove a post by slug
export async function DELETE(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  await connectToDB();

  try {
    const deleted = await Post.findOneAndDelete({ slug: params.slug });

    if (!deleted) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting post' }, { status: 500 });
  }
}
