interface EventBadgeProps {
  type: 'category' | 'free' | 'paid' | 'registration';
  label: string;
}

const EventBadge: React.FC<EventBadgeProps> = ({ type, label }) => {
  const getBadgeStyles = () => {
    switch (type) {
      case 'category':
        return 'bg-blue-100 text-blue-800';
      case 'free':
        return 'bg-green-100 text-green-800';
      case 'paid':
        return 'bg-yellow-100 text-yellow-800';
      case 'registration':
        return 'bg-purple-100 text-purple-800';
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
