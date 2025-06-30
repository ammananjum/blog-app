import { notFound } from 'next/navigation';
import connectToDB from '@/lib/db';
import Post from '@/models/Post';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
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

export default async function BlogPage({ params }: { params: any }) {
  await connectToDB();
  const post = await Post.findOne({ slug: params.slug });

  if (!post) {
    return notFound();
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-6">{post.description}</p>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}
