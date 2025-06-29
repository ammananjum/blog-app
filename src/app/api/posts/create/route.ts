import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Post from '@/models/Post'; 

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, content, imageUrl } = body;

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    await dbConnect();

    const slug = generateSlug(title);

    const existing = await Post.findOne({ slug });
    if (existing) {
      return NextResponse.json({ error: 'Post with same slug already exists' }, { status: 400 });
    }

    const newPost = await Post.create({
      title,
      content,
      slug,
      imageUrl: imageUrl || '', // Add this line
    });

    return NextResponse.json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
