import React from 'react';
import { Users, Music, BookOpen, Clock } from 'lucide-react';

interface WhatToExpectItem {
  title: string;
  description: string;
  icon: string;
}

interface WhatToExpectProps {
  title?: string;
  items?: WhatToExpectItem[];
}

const iconMap = {
  users: Users,
  music: Music,
  book: BookOpen,
  clock: Clock,
};

export default function WhatToExpect({ title = "What To Expect", items }: WhatToExpectProps) {
  const defaultItems = [
    { title: "Friendly community", description: "Warm and welcoming atmosphere", icon: "users" },
    { title: "Spirit-filled worship", description: "Powerful worship and praise", icon: "music" },
    { title: "Practical biblical teaching", description: "Relevant and life-changing messages", icon: "book" },
    { title: "Services last about 90 minutes", description: "Structured and engaging service", icon: "clock" },
  ];

  const displayItems = items || defaultItems;

  return (
    <section className="py-16 bg-background dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground dark:text-white">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayItems.map((item, index) => {
            const IconComponent = iconMap[item.icon as keyof typeof iconMap] || Users;
            return (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                    <IconComponent className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground dark:text-white">{item.title}</h3>
                <p className="text-muted-foreground dark:text-gray-300">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
