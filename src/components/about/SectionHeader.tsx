interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
}

const SectionHeader = ({ label, title, subtitle }: SectionHeaderProps) => {
  return (
    <div className="text-center mb-12">
      {label && (
        <span 
          className="text-gray-600 italic block mb-4"
          style={{ 
            fontSize: '18px',
            fontFamily: 'Georgia, serif'
          }}
        >
          {label}
        </span>
      )}
      
      <h2 
        className="text-black font-bold mb-6" 
        style={{ fontSize: '52px', lineHeight: '1.1' }}
      >
        {title}
      </h2>
      
      {subtitle && (
        <p 
          className="text-gray-600 mx-auto" 
          style={{ 
            fontSize: '16px', 
            lineHeight: '1.7', 
            maxWidth: '520px' 
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
