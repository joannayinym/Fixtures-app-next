export default function Home() {
  return (
    <div className="flex flex-row justify-center items-center h-screen bg-[url('/bg.jpg')] bg-cover bg-center">
      <button className="bg-blue-500 text-white px-4 py-2 rounded mr-4">
        <a href="/upload">Upload CSV Data</a>
      </button>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        <a href="/search">Search Fixtures</a>
      </button>
    </div>
  );
}
