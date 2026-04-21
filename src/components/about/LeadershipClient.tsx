'use client';

import Image from 'next/image';
import { urlFor } from '../../sanity/lib/image';
import { StaffMember } from '@/types/staff';

interface LeadershipClientProps {
  groupedStaff: Record<string, StaffMember[]>;
}

function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

export default function LeadershipClient({ groupedStaff }: LeadershipClientProps) {
  return (
    <div className="space-y-16">
      {Object.entries(groupedStaff).map(([category, staff]) => (
        <div key={category}>
          {/* Category heading */}
          <h3 className="text-[13px] uppercase tracking-[0.1em] text-[#0d9488] font-semibold mb-8 border-b-2 border-[#e5e7eb] pb-3">
            {category}
          </h3>
          
          {/* Grid: 3 cols desktop, 2 cols tablet, 2 cols mobile (480px+), 1 col below */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {staff.map((member) => (
              <div 
                key={member._id} 
                className="bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden transition-all duration-200 hover:-translate-y-[3px] hover:border-[#0d9488] group"
              >
                {/* Photo - 3/4 aspect ratio, portrait rectangle */}
                <div className="aspect-[3/4] relative bg-[#e5e7eb] overflow-hidden">
                  {member.photo ? (
                    <Image
                      src={urlFor(member.photo).width(400).height(534).url()}
                      alt={member.name}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div 
                      className="w-full h-full flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, #0d9488, #0f766e)',
                      }}
                    >
                      <span className="text-white text-[36px] font-bold">
                        {getInitials(member.name)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card body */}
                <div className="p-5">
                  <h4 className="text-[17px] font-bold text-[#111111] group-hover:text-[#0d9488] transition-colors">
                    {member.name}
                  </h4>
                  <p className="text-[13px] text-[#0d9488] font-medium mt-1">
                    {member.role}
                  </p>
                  {member.bio && (
                    <p className="text-[14px] text-[#666666] leading-[1.6] mt-2.5 line-clamp-3">
                      {member.bio}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
