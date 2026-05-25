const Blog = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-8">
        Nainocular Blog
      </h1>

      <p className="text-gray-600 mb-6">
        Explore articles about eye health, AI-powered
        vision therapy, gaming exercises, and child
        wellness.
      </p>

      <div className="space-y-6">
        <div className="border p-6 rounded-xl">
          <h2 className="text-2xl font-semibold mb-2">
            How Vision Games Improve Focus
          </h2>

          <p className="text-gray-600">
            Learn how interactive exercises can help
            improve visual attention and coordination.
          </p>
        </div>

        <div className="border p-6 rounded-xl">
          <h2 className="text-2xl font-semibold mb-2">
            AI in Eye Therapy
          </h2>

          <p className="text-gray-600">
            Discover how artificial intelligence is
            transforming digital healthcare experiences.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Blog;