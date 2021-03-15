import { useState } from "react";

const articles = ["pořídit snímek obrazovky", "zadat úkol v Teams"];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    fetch(`/api/search?searchTerm=${encodeURI(event.target.value)}`)
      .then((res) => res.json())
      .then(setResults);
  };
  return (
    <>
      <div className="w-full bw-white p-8 h-screen">
        {/* from-blue-400 to-blue-600 */}
        <div className="max-w-xl mx-auto">
          <h1 className="text-5xl font-bold text-shadow text-transparent bg-clip-text bg-gradient-to-br from-yellow-400 to-yellow-500">
            Otevřený manuál pro online&nbsp;výuku
          </h1>

          <div className="text-center">
            <input
              className="shadow-md rounded-lg px-6 py-3 mt-8 text-xl focus:shadow-lg transition-all max-w-sm focus:max-w-md focus:outline-none w-full"
              placeholder="Hledat článek..."
              value={searchTerm}
              onInput={onSearch}
            />
          </div>

          {searchTerm ? (
            <div className="mt-8">
              {results.map((article) => (
                <div className="bg-white p-4 m-2 rounded-lg shadow-md cursor-pointer">
                  Jak {article}
                </div>
              ))}
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    </>
  );
}
