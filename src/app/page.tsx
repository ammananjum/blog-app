'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Post {
  _id: string;
  title: string;
  content: string;
  slug: string;
  imageUrl?: string; 
  createdAt: string;
}

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
   
<section className="relative w-full h-[90vh] overflow-hidden">
  <video
    className="absolute top-0 left-0 w-full h-full object-cover z-0"
    src="/videos/hero.mp4"
    autoPlay
    loop
    muted
    playsInline
  ></video>

  {/* Lighter overlay */}
  <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>

  {/* Text */}
  <div className="relative z-20 flex flex-col justify-center items-center h-full text-center px-4">
    <h1 className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow mb-4">
      Write. Share. Inspire.
    </h1>
    <p className="text-lg sm:text-2xl text-gray-200 max-w-2xl mx-auto drop-shadow">
      Welcome to a developer-focused blog platform where content meets creativity.
    </p>
    <Link
      href="/admin"
      className="mt-8 inline-block bg-blue-600 hover:bg-blue-700 text-white text-xl px-6 py-3 rounded-md shadow-lg transition"
    >
    Start Writting 
    </Link>
  </div>
</section>


      
<section id="about" className="bg-white py-20 px-6">
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-4xl font-bold mb-6 text-gray-900"> About This Project</h2>
    <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
      This blog platform was built as a full-stack internship project, focusing on modern web technologies
      and real-world functionality for content creators and developers.
    </p>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left mt-10">
      <div className="p-6 rounded-lg border hover:shadow-xl transition">
        <h3 className="text-xl font-semibold mb-2 text-blue-600">Tech Stack</h3>
        <p className="text-gray-600">
          Developed using <strong>Next.js 14</strong>, <strong>Tailwind CSS</strong>, <strong>MongoDB</strong>,
          and <strong>React-Quill</strong> for rich text editing.
        </p>
      </div>

      <div className="p-6 rounded-lg border hover:shadow-xl transition">
        <h3 className="text-xl font-semibold mb-2 text-blue-600">Features</h3>
        <ul className="list-disc ml-5 text-gray-600">
          <li>SEO-friendly URLs (slugs)</li>
          <li>Rich Text Editor</li>
          <li>CRUD Dashboard</li>
          <li>Dynamic Post Rendering</li>
        </ul>
      </div>

      <div className="p-6 rounded-lg border hover:shadow-xl transition">
        <h3 className="text-xl font-semibold mb-2 text-blue-600">Why This Matters</h3>
        <p className="text-gray-600">
          This project demonstrates my ability to build full-stack, scalable, and responsive applications,
          with a focus on clean design and modern development practices.
        </p>
      </div>
    </div>
  </div>
</section>


      {/* Posts */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <h2 className="text-3xl font-bold mb-10 text-center">Latest Posts</h2>

        {posts.length === 0 ? (
          <p className="text-center text-gray-500">No blog posts yet. Please add some!</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white border rounded-lg shadow hover:shadow-xl transition duration-300 overflow-hidden"
              >
            <img
            src={post.imageUrl || 'https://source.unsplash.com/600x400/?technology,blog'}
            alt={post.title}
            className="w-full h-48 object-cover"
            />




                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p
                    className="text-gray-600 text-sm line-clamp-3 mb-4"
                    dangerouslySetInnerHTML={{
                      __html:
                        post.content.replace(/<[^>]*>/g, '').slice(0, 120) + '...',
                    }}
                  ></p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    
   <section
  id="contact"
  className="w-screen bg-gradient-to-r from-[#e0f2fe] to-[#f0f9ff] py-12 relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] border-t border-blue-100"
>
  <div className="text-center px-4">
    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4">
      Let’s Connect
    </h2>
    <p className="text-gray-600 text-base sm:text-lg mb-6 max-w-2xl mx-auto">
      I’d love to hear your thoughts, suggestions, or opportunities to collaborate.
    </p>
    <a
      href="mailto:emaananjum634@gmail.com"
      className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-base px-6 py-3 rounded-md shadow transition"
    >
      Email Me
    </a>
  </div>
</section>







    </div>
  );
}
