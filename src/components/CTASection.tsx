import React from 'react';
import Link from 'next/link';

interface CTASectionProps {
  title: string;
  subtitle?: string;
  buttonText: string;
  buttonLink: string;
  email?: boolean;
}

export default function CTASection({ title, subtitle, buttonText, buttonLink, email }: CTASectionProps) {
  return (
    <div className="bg-primary text-white py-16 text-center">
      <h2 className="text-3xl font-heading font-bold mb-4">{title}</h2>
      {subtitle && <p className="text-lg mb-8">{subtitle}</p>}
      {email ? (
        <div className="max-w-md mx-auto">
          <input type="email" placeholder="Enter your email" className="w-full px-4 py-2 mb-4 text-black rounded" />
          <button className="bg-accent text-primary px-6 py-2 rounded font-semibold hover:bg-yellow-400">
            {buttonText}
          </button>
        </div>
      ) : (
        <Link href={buttonLink} className="bg-accent text-primary px-6 py-2 rounded font-semibold hover:bg-yellow-400">
          {buttonText}
        </Link>
      )}
    </div>
  );
}
