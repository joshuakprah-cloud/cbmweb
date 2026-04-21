import React from 'react';

interface Principle {
  number: number;
  statement: string;
  value: string;
}

const principles: Principle[] = [
  { number: 1, statement: 'Jesus is the center.', value: 'Integrated Priorities' },
  { number: 2, statement: 'We believe big and start small.', value: 'Active Faith' },
  { number: 3, statement: 'We honor one another to glorify God.', value: 'Valuing People' },
  { number: 4, statement: 'We are contributors, not consumers.', value: 'Taking Action' },
  { number: 5, statement: 'We think inside the box.', value: 'Embracing Limitation' },
  { number: 6, statement: 'We can do more by doing less.', value: 'Focused Excellence' },
  { number: 7, statement: "We don't maintain, we multiply.", value: 'Ongoing Growth' },
  { number: 8, statement: 'We eat the fish and leave the bones.', value: 'Teachable Attitudes' },
  { number: 9, statement: 'We want to be known for what we are for.', value: 'Promoting Unity' },
  { number: 10, statement: 'We will not take this for granted.', value: 'Expressing Gratitude' },
];

interface CodePrinciplesProps {
  eyebrow?: string;
  title?: string;
  description?: string;
}

export default function CodePrinciples({
  eyebrow = 'How we think',
  title = 'Our Code Principles',
  description = "Learn the ten values that keep the vision of ThaGospel Church clear. They are the guiding values that reflect our priority to reach people with the gospel and keep us unified in our mission. The culture of our church is rooted in audacious faith. We're clear on what God has called us to do, and we take every opportunity He gives us to live it out."
}: CodePrinciplesProps) {
  return (
    <section 
      role="region" 
      aria-label="Code principles"
      className="bg-[#111111] py-16 md:py-24 px-6 md:px-20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <span className="text-[13px] uppercase tracking-[0.08em] text-white/60 font-medium">
            {eyebrow}
          </span>
          
          <h2 className="text-[32px] md:text-[44px] lg:text-[52px] font-bold text-white leading-[1.15] mt-3">
            {title}
          </h2>
          
          <p className="text-[16px] md:text-[17px] text-white/70 leading-[1.7] mt-4 max-w-[900px]">
            {description}
          </p>
        </div>

        {/* Principles List */}
        <div className="space-y-0">
          {principles.map((principle, index) => (
            <div 
              key={principle.number}
              className="border-b border-white/10 py-6 first:pt-0"
            >
              <p className="text-[18px] md:text-[20px] text-white leading-[1.5]">
                <span className="font-bold">{principle.number}. {principle.statement}</span>
                <span className="text-white/60"> It's about: </span>
                <span className="font-medium">{principle.value}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
