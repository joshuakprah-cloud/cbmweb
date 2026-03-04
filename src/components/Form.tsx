const Form = () => {
  return (
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input type="text" className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input type="email" className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Message</label>
        <textarea rows={4} className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent resize-vertical"></textarea>
      </div>
      <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded font-inter hover:bg-purple-700 transition-colors">Submit</button>
    </form>
  );
};

export default Form;
