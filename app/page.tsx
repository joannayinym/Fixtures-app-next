export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen bg-[url('/bg.jpg')] bg-cover bg-center">
        <div>
          <h1 className="text-xl text-center font-bold mb-4 text-amber-500 md:text-4xl">
            Welcome to Fixtures App
          </h1>
          <p className="text-[14px] text-gray-800 mb-8 md:text-lg">
            Upload your CSV data and search for fixtures easily.
          </p>
        </div>
        <div className="flex flex-row justify-center items-center">
          <button className="bg-blue-500 text-white px-4 py-2 rounded mr-4">
            <a href="/upload">Upload CSV Data</a>
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            <a href="/search">Search Fixtures</a>
          </button>
        </div>
      </div>
    </>
  );
}
