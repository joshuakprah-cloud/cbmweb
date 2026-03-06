const YouBelongHere = () => {
  const cards = [
    {
      title: "I'm New",
      description: "Learn what to expect at ThaGospel Church",
      button: "Start Here",
      link: "/new-here"
    },
    {
      title: "Plan Your Visit",
      description: "Find service times and directions",
      button: "Plan Visit",
      link: "/plan-your-visit"
    },
    {
      title: "Watch a Sermon",
      description: "Experience biblical teaching online",
      button: "Watch Sermon",
      link: "/sermons"
    },
    {
      title: "Prayer Request",
      description: "Let us stand with you in prayer",
      button: "Submit Prayer",
      link: "/prayer"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">You Belong Here</h2>
          <p className="text-lg text-muted-foreground">Discover how you can get involved and connect with our community</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
              <h3 className="text-xl font-semibold font-inter text-foreground mb-2">{card.title}</h3>
              <p className="text-muted-foreground mb-6">{card.description}</p>
              <a href={card.link} className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                {card.button}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default YouBelongHere;
