import Image from 'next/image';

interface LogoProps {
  variant?: 'dark' | 'white';
}

export const Logo = ({ variant = 'dark' }: LogoProps) => {
  const logoSrc = variant === 'white' ? '/logo w.png' : '/logo.png';

  return (
    <div className="relative w-48 h-16">
      <Image
        src={logoSrc}
        alt="ThaGospel Church Logo"
        fill
        className="object-contain transition-opacity duration-300"
      />
    </div>
  );
};
