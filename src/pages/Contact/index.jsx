const Contact = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-8">
        Contact Us
      </h1>

      <p className="text-gray-600 mb-10">
        We'd love to hear from you. Reach out to us for
        support, feedback, partnerships, or any questions
        regarding Nainocular.
      </p>

      <div className="grid md:grid-cols-2 gap-10">
        
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="border rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-3">
              Email
            </h2>

            <p className="text-gray-600">
              hello@nainocular.com
            </p>
          </div>

          <div className="border rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-3">
              Phone
            </h2>

            <p className="text-gray-600">
              +91 9205050993
            </p>
          </div>

          <div className="border rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-3">
              Location
            </h2>

            <p className="text-gray-600">
              Delhi, India
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <form className="space-y-6 border rounded-2xl p-6">
          <div>
            <label className="block mb-2 font-medium">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Message
            </label>

            <textarea
              rows="5"
              placeholder="Write your message..."
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-[#ff7a00] hover:bg-orange-600 text-white px-6 py-3 rounded-xl transition-all duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;