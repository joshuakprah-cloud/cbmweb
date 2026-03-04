const LiveStream = () => {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold font-inter text-foreground">Live Stream</h2>
        </div>
        <div className="aspect-video">
          <iframe
            src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
            title="Live Stream"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
    </section>
  )
}

export default LiveStream
