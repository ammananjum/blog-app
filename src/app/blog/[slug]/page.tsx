
 import { notFound } from 'next/navigation';
import connectToDB from '@/lib/db';
import Post from '@/models/Post';
import { Metadata } from 'next';

// ✅ Correct type for route parameters
type PageProps = {
  params: {
    slug: string;
  };
};

// ✅ Generate metadata based on the slug
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  await connectToDB();
  const post = await Post.findOne({ slug: params.slug });

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
  };
}

// ✅ Main blog page component
export default async function BlogPage({ params }: PageProps) {
  await connectToDB();
  const post = await Post.findOne({ slug: params.slug });

  if (!post) {
    return notFound();
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.description}</p>
      <div>{post.content}</div>
    </div>
  );
}
