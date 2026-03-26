import Image from 'next/image';

const MeetPastor = ({ pastorMessage }: { pastorMessage: any }) => {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-inter text-foreground">
          Meet Our Pastor
        </h2>
        <div className="md:flex items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <div className="relative w-full h-96">
              <Image
                src="/placeholder-pastor.jpg" // Placeholder image
                alt="Lead Pastor"
                fill
                className="object-cover rounded-lg shadow-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className="md:w-1/2 md:pl-12">
            <p className="text-lg text-foreground leading-relaxed mb-4">
              {pastorMessage}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetPastor;
