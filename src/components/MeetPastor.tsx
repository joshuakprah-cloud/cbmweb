const MeetPastor = () => {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-inter text-foreground">
          Meet Our Lead Pastor
        </h2>
        <div className="md:flex items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img
              src="/placeholder-pastor.jpg" // Placeholder image
              alt="Lead Pastor"
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 md:pl-12">
            <p className="text-lg text-foreground leading-relaxed mb-4">
              As the lead pastor of ThaGospel Church, my vision is to build a community where every person can encounter God's love, grow in faith, and discover their unique purpose in His kingdom.
            </p>
            <p className="text-lg text-foreground leading-relaxed mb-4">
              Together, we strive to make a lasting impact in our city and beyond, fostering spiritual growth, strong families, and compassionate outreach.
            </p>
            <p className="text-lg text-foreground leading-relaxed">
              Our church is a place where tradition meets innovation, and where every voice is heard and valued in our shared journey of faith.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetPastor;
