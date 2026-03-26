import Image from 'next/image';

interface CardProps {
  image: string;
  title: string;
  description: string;
  buttonText: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ image, title, description, buttonText, onClick }) => {
  return (
    <div className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border">
      <div className="relative w-full h-48">
        <Image 
          src={image} 
          alt={title} 
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 font-inter">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <button onClick={onClick} className="bg-purple-600 text-white px-4 py-2 rounded font-inter hover:bg-purple-700 transition-colors">{buttonText}</button>
      </div>
    </div>
  );
};

export default Card;
