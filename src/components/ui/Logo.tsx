import Image from 'next/image';

export const Logo = () => {
  return (
    <div className="relative w-48 h-16">
      <Image
        src="/logo.png"
        alt="ThaGospel Church Logo"
        fill
        className="object-contain"
      />
    </div>
  );
};
