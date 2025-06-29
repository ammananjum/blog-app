'use client';

import { useEffect, useState } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';

export default function EditPostPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { quill, quillRef } = useQuill();
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!quill) return;

    fetch(`/api/posts/${slug}`)
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed to fetch post');
        return await res.json();
      })
      .then((data) => {
        setTitle(data.title);
        quill.clipboard.dangerouslyPasteHTML(data.content);
      })
      .catch(() => {
        alert('❌ Could not load the post');
      });
  }, [quill, slug]);

  const handleUpdate = async () => {
    const content = quill?.root.innerHTML || '';

    const res = await fetch(`/api/posts/${slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage('✅ Post updated!');
      router.push('/admin');
    } else {
      setMessage(`❌ ${data.error}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">✏️ Edit Post</h1>
          <p className="text-gray-600">Update your blog content.</p>
        </div>
        <Image
          src="/assets/write.png"
          alt="Edit Illustration"
          width={250}
          height={150}
          className="hidden md:block"
        />
      </div>

      <div className="bg-white border rounded-lg shadow-md p-6">
        <label className="block font-semibold text-gray-700 mb-2">Title</label>
        <input
          type="text"
          className="border border-gray-300 rounded w-full p-2 mb-6 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="block font-semibold text-gray-700 mb-2">Content</label>
        <div
          ref={quillRef}
          className="h-[300px] mb-6 bg-white border border-gray-300 rounded"
        />

        <button
          onClick={handleUpdate}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          💾 Update Post
        </button>

        {message && (
          <p className="mt-4 text-sm text-center font-medium text-gray-700">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
