'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

interface Post {
  _id: string;
  title: string;
  content: string;
  slug: string;
  imageUrl?: string;
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          console.error('Unexpected API response:', data);
          setPosts([]);
        }
      })
      .catch((err) => {
        console.error('Error fetching posts:', err);
        setPosts([]);
      });
  }, []);

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    const res = await fetch(`/api/posts/${slug}`, { method: 'DELETE' });
    const data = await res.json();

    if (res.ok) {
      alert('Post deleted!');
      setPosts((prev) => prev.filter((p) => p.slug !== slug));
    } else {
      alert(`Error: ${data.error}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 text-white rounded-xl overflow-hidden shadow-md mb-10">
        <div className="grid md:grid-cols-2 items-center gap-6 px-8 py-8">
          <div>
            <h1 className="text-4xl font-bold mb-3 drop-shadow">Admin Dashboard</h1>
            <p className="text-lg opacity-90">
              Manage all your blog posts with a clean and responsive interface.
            </p>
            <Link
              href="/admin/create"
              className="inline-block mt-4 bg-white text-blue-700 font-semibold px-5 py-2.5 rounded-lg shadow hover:bg-gray-100 transition"
            >
              Create New Post
            </Link>
          </div>
          <div className="hidden md:block">
            <Image
              src="/assets/dashboard.svg"
              alt="Admin"
              width={400}
              height={250}
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Posts */}
      {posts.length === 0 ? (
        <div className="text-center mt-20 text-gray-500">
          <Image
            src="/assets/empty-state.svg"
            alt="No posts"
            width={300}
            height={200}
            className="mx-auto mb-6"
          />
          <p>No posts found. Start by creating your first post.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white border rounded-lg shadow hover:shadow-xl transition duration-300 overflow-hidden"
            >
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-5">
                <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                  {post.title}
                </h2>
                <p className="text-gray-500 text-sm truncate">
                  <strong>Slug:</strong> {post.slug}
                </p>

                <div className="flex justify-end items-center gap-4 mt-4 text-sm">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex items-center gap-1 text-blue-600 hover:underline"
                  >
                    <FaEye /> View
                  </Link>
                  <Link
                    href={`/admin/edit/${post.slug}`}
                    className="flex items-center gap-1 text-green-600 hover:underline"
                  >
                    <FaEdit /> Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(post.slug)}
                    className="flex items-center gap-1 text-red-600 hover:underline"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
