import React from 'react';

interface QuickAction {
  label: string;
  icon: string;
}

interface QuickActionsProps {
  actions: QuickAction[];
}

const QuickActions: React.FC<QuickActionsProps> = ({ actions }) => {
  if (!actions || actions.length === 0) return null;

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-8">
          {actions.map((action, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-2">{action.icon}</div>
              <p className="text-sm font-medium">{action.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickActions;
