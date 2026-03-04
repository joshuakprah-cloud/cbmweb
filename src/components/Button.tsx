interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  href?: string;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', onClick, href }) => {
  const baseClasses = "px-6 py-3 rounded-lg font-inter font-semibold transition-colors duration-300";
  const variants = {
    primary: "bg-purple-600 text-white hover:bg-purple-700",
    secondary: "border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
  };

  if (href) {
    return (
      <a href={href} className={`${baseClasses} ${variants[variant]}`}>
        {children}
      </a>
    );
  }

  return (
    <button className={`${baseClasses} ${variants[variant]}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
