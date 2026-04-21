import React from 'react';

interface BeliefsHeroProps {
  eyebrow?: string;
  title?: string;
  description?: string;
}

export default function BeliefsHero({
  eyebrow = 'What we value',
  title = 'The Foundation of our Beliefs',
  description = "The foundation of our beliefs is the timeless truth of the Bible, which we believe to be the inspired Word of God. We believe that salvation is a gift from God, provided through the death and resurrection of Jesus. The grace of God and forgiveness of sin is available to everyone who calls on His Name."
}: BeliefsHeroProps) {
  return (
    <section 
      role="banner"
      className="relative bg-[#0a0a0a] pt-[120px] lg:pt-[140px] pb-16 md:pb-24 px-6 md:px-20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Hero Content */}
        <div className="max-w-4xl mb-16 md:mb-20">
          {/* Eyebrow */}
          <span className="text-[13px] uppercase tracking-[0.08em] text-white/60 font-medium">
            {eyebrow}
          </span>
          
          {/* Title */}
          <h1 className="text-[36px] md:text-[48px] lg:text-[56px] font-bold text-white leading-[1.1] tracking-tight mt-3">
            {title}
          </h1>
          
          {/* Description */}
          <p className="text-[16px] md:text-[17px] text-white/70 leading-[1.7] mt-6 max-w-[800px]">
            {description}
          </p>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Vision Statement Card */}
          <div className="bg-[#1a1a1a] rounded-2xl p-8 md:p-10">
            <h2 className="text-[14px] uppercase tracking-[0.08em] text-white/60 font-medium mb-2">
              Vision Statement
            </h2>
            <p className="text-[28px] md:text-[32px] font-bold text-white leading-[1.2]">
              See what God can do through you.
            </p>
            <p className="text-[15px] text-white/70 leading-[1.7] mt-4">
              Our vision statement is an invitation to step into the potential that God has placed within you. It&apos;s about recognizing that while you&apos;ve seen what you can accomplish on your own, there&apos;s a whole new level of impact and purpose when you allow God to work through you.
            </p>
          </div>

          {/* Mission Statement Card */}
          <div className="bg-[#1a1a1a] rounded-2xl p-8 md:p-10">
            <h2 className="text-[14px] uppercase tracking-[0.08em] text-white/60 font-medium mb-2">
              Mission Statement
            </h2>
            <p className="text-[28px] md:text-[32px] font-bold text-white leading-[1.2]">
              We exist so that people far from God will be raised to life in Christ.
            </p>
            <p className="text-[15px] text-white/70 leading-[1.7] mt-4">
              Our mission statement is the heartbeat that drives everything we do. It&apos;s a call to action, a reminder that we&apos;re here to make a difference, to bring people to Jesus, and to see lives transformed by the power of the gospel.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
