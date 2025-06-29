import { notFound } from 'next/navigation';
import connectToDB from '@/lib/db';
import Post from '@/models/Post';
import { Metadata } from 'next';
import Image from 'next/image';

// ✅ Correct interface
interface BlogPageProps {
  params: {
    slug: string;
  };
}

// ✅ FIXED: Properly typed metadata function
export async function generateMetadata(
  props: { params: { slug: string } }
): Promise<Metadata> {
  const { params } = props;
  await connectToDB();
  const post = await Post.findOne({ slug: params.slug });

  if (!post) return {};

  return {
    title: post.title,
    description: post.content.replace(/<[^>]*>/g, '').slice(0, 150),
  };
}

// ✅ Page Component
export default async function BlogPage({ params }: BlogPageProps) {
  await connectToDB();
  const post = await Post.findOne({ slug: params.slug });

  if (!post) return notFound();

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-100 to-purple-100 py-12 px-4 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          {post.title}
        </h1>
        <p className="text-gray-600 text-sm">
          Published on {new Date(post.createdAt).toDateString()}
        </p>
        <div className="mt-6 flex justify-center">
          <Image
            src="/assets/blogging.svg"
            alt="Post illustration"
            width={300}
            height={200}
          />
        </div>
      </div>

      {/* Content */}
      <article className="prose lg:prose-lg prose-blue mx-auto px-4 sm:px-6 py-12">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </div>
  );
}
