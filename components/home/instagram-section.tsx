'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, MessageCircle, Check } from 'lucide-react';

export function InstagramSection() {
  const instagramPosts = [
    {
      id: 1,
      image: '/posts/post1.png',
      isVideo: true,
      likes: 115,
      comments: 4,
      hashtags: ['#muscletrailathlete', '#muscletrail', '#muscletrailsupplements', '#workoutmotivation', '#nevergiveup']
    },
    {
      id: 2,
      image: '/posts/post2.png',
      isVideo: true,
      likes: 95,
      comments: 3,
      hashtags: ['#workout', '#fitness', '#muscletrail']
    },
    {
      id: 3,
      image: '/posts/post3.png',
      isVideo: true,
      likes: 87,
      comments: 2,
      hashtags: ['#supplements', '#protein', '#muscletrail']
    },
    {
      id: 4,
      image: '/posts/post4.png',
      isVideo: true,
      likes: 156,
      comments: 8,
      hashtags: ['#fitness', '#motivation', '#muscletrail']
    },
    {
      id: 5,
      image: '/posts/post5.png',
      isVideo: true,
      likes: 134,
      comments: 5,
      hashtags: ['#gym', '#workout', '#muscletrail']
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12"
        >
          Follow Us On Instagram
        </motion.h2>

                 {/* Profile Card */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, delay: 0.2 }}
           className="bg-white rounded-2xl p-6 mb-12 max-w-4xl mx-auto"
         >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Profile Info */}
            <div className="flex items-center gap-4">
              {/* Profile Picture */}
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 p-1">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">MT</span>
                  </div>
                </div>
              </div>
              
              {/* Profile Details */}
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-gray-900">Muscle Trail Supplements</h3>
                <Check className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-gray-600">@muscletrail</p>
            </div>

            {/* Stats */}
            <div className="flex gap-8 text-center">
              <div>
                <p className="text-2xl font-bold text-gray-900">1.1K</p>
                <p className="text-gray-600 text-sm">Posts</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">18.2K</p>
                <p className="text-gray-600 text-sm">Followers</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">812</p>
                <p className="text-gray-600 text-sm">Following</p>
              </div>
            </div>

            {/* Follow Button */}
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors duration-300">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Follow
            </button>
          </div>
        </motion.div>

        {/* Instagram Posts Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative"
        >
          {/* Navigation Arrows */}
          <button className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black text-white p-2 rounded-full shadow-lg hover:bg-gray-800 transition-colors duration-300">
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black text-white p-2 rounded-full shadow-lg hover:bg-gray-800 transition-colors duration-300">
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Posts Container */}
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {instagramPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="relative flex-shrink-0 w-80 h-80 group cursor-pointer"
              >
                                 <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt={`Instagram post ${post.id}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  {/* Video Indicator */}
                  {post.isVideo && (
                    <div className="absolute top-3 right-3 bg-white/90 rounded-full p-1">
                      <svg className="w-4 h-4 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  )}

                  {/* Overlay with Engagement */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-end">
                    <div className="p-4 w-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {/* Engagement Stats */}
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          <span className="text-sm">{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-sm">{post.comments}</span>
                        </div>
                      </div>
                      
                      {/* Hashtags */}
                      <div className="flex flex-wrap gap-1">
                        {post.hashtags.slice(0, 3).map((tag, tagIndex) => (
                          <span key={tagIndex} className="text-xs bg-white/20 px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
