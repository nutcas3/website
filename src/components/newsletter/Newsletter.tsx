"use client";

import React, { useState } from 'react';
import { toast, Toaster } from 'sonner';
import Image from 'next/image';
import { subscribeToNewsletter } from '@/src/actions/newsleter/create';
const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('email', email);
      
      const result = await subscribeToNewsletter(formData);
      
      if (result.success) {
        toast.success(result.message);
        setEmail('');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.');
      console.error('Newsletter subscription error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="container mx-auto px-4 py-16">
      <Toaster position="top-center" richColors />
      <div className="bg-[#FDF7F5] p-8 rounded-lg flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex-1 pr-8">
          <h2 className="text-3xl font-bold mb-2">Stay up-to-date with GopherCon Africa</h2>
          <p className="text-gray-600 mb-4">
            Enter your email address to join the GopherCon Africa mailing list and be the first to hear our
            latest news and announcements.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#2D3748] text-white px-6 py-2 rounded-md hover:bg-[#1A202C] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        </div>
        <div className="hidden md:block">
          <Image    
            src="https://res.cloudinary.com/dlmqe0two/image/upload/v1744802566/mascot-kenya_pxfwhg.png"
            alt="Gopher mascot"
            width={192}
            height={192}
            className="w-48 h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Newsletter; 