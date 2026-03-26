import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function GalleryPreview() {
  const images = ['/gallery1.jpg', '/gallery2.jpg', '/gallery3.jpg', '/gallery4.jpg', '/gallery5.jpg', '/gallery6.jpg'];
  return (
    <section className="section">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary text-center mb-12">Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <div key={i} className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
              <Image src={img} alt={`Gallery ${i+1}`} fill className="object-cover" />
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/gallery" className="bg-primary text-white px-6 py-2 rounded font-semibold hover:bg-blue-700">
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}
