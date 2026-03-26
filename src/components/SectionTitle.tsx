import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">{title}</h2>
      {subtitle && <p className="text-lg font-body text-neutral-fg">{subtitle}</p>}
    </div>
  );
}
