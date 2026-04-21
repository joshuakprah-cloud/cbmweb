interface EventBadgeProps {
  type: 'category' | 'free' | 'paid' | 'registration';
  label: string;
}

const EventBadge: React.FC<EventBadgeProps> = ({ type, label }) => {
  const getBadgeStyles = () => {
    switch (type) {
      case 'category':
        // Teal badge
        return 'bg-[#0d9488] text-white';
      case 'free':
        // Green badge
        return 'bg-green-500 text-white';
      case 'paid':
        // Gold badge with navy text
        return 'bg-[#C6A75E] text-[#0B1F3A]';
      case 'registration':
        // Amber/Orange badge for urgency
        return 'bg-amber-500 text-white';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBadgeStyles()}`}>
      {label}
    </span>
  );
};

export default EventBadge;
