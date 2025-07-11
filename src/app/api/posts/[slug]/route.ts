import { NextRequest, NextResponse } from 'next/server';
import connectToDB from '@/lib/db';
import Post from '@/models/Post';

// ✅ GET a single post by slug
export async function GET(req: NextRequest, context: any) {
  await connectToDB();

  try {
    const post = await Post.findOne({ slug: context.params.slug });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

// ✅ DELETE a single post by slug
export async function DELETE(req: NextRequest, context: any) {
  await connectToDB();

  try {
    const deleted = await Post.findOneAndDelete({ slug: context.params.slug });

    if (!deleted) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting post' }, { status: 500 });
  }
}
