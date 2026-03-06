const YouBelongHere = ({ items }: { items: any }) => {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">You Belong Here</h2>
          <p className="text-lg text-muted-foreground">Discover how you can get involved and connect with our community</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item: any, index: number) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold font-inter text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground mb-4">{item.description}</p>
              <a href={item.link} className="text-blue-600 hover:text-blue-800 font-medium">
                Learn More →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default YouBelongHere;
