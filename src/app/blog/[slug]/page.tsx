import { notFound } from 'next/navigation';
import connectToDB from '@/lib/db';
import Post from '@/models/Post';
import { Metadata } from 'next';
import Image from 'next/image';

type PageProps = {
  params: {
    slug: string;
  };
};

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
    description: post.description,
  };
}

export default async function BlogPage({ params }: PageProps) {
  await connectToDB();
  const post = await Post.findOne({ slug: params.slug });

  if (!post) return notFound();

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <Image
        src={post.image}
        alt={post.title}
        width={800}
        height={400}
        className="rounded-lg mb-6"
      />
      <div className="text-lg leading-8 text-gray-800">{post.content}</div>
    </div>
  );
}
