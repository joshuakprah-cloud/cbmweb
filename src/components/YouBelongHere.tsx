const YouBelongHere = () => {
  const items = [
    {
      title: 'Spirit-filled Worship',
      description: 'Experience the presence of God in our dynamic services filled with praise, worship, and the moving of the Holy Spirit.',
    },
    {
      title: 'Biblical Teaching',
      description: 'Grow in your faith through sound, practical teaching from God\'s Word that applies to everyday life.',
    },
    {
      title: 'Strong Community',
      description: 'Join a loving family of believers who support, encourage, and journey together in faith.',
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-inter text-foreground">
          You Belong Here
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div key={index} className="text-center">
              <h3 className="text-xl font-semibold mb-4 font-inter text-foreground">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default YouBelongHere;
