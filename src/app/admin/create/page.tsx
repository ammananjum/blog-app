'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';

export default function CreatePostPage() {
  const { quill, quillRef } = useQuill();
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const router = useRouter();

  const handleCreate = async () => {
    const content = quill?.root.innerHTML || '';

    const res = await fetch('/api/posts/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, imageUrl }),
    });

    if (res.ok) {
      router.push('/admin');
    } else {
      alert('❌ Failed to create post');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>

      <input
        type="text"
        placeholder="Post Title"
        className="border w-full p-2 mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Image URL (optional)"
        className="border w-full p-2 mb-4"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />

      <div ref={quillRef} className="mb-4" />

      <button
        onClick={handleCreate}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Create Post
      </button>
    </div>
  );
}
