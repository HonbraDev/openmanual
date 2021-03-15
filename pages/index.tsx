import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(event.target.value);

  return (
    <>
      <div className="mt-6 pb-4 px-6 mx-auto max-w-4xl border-b border-gray-300">
        <Link href="/">
          <h1 className=" text-2xl font-light cursor-pointer">OpenManual</h1>
        </Link>
      </div>
      <div className="my-6 px-6 mx-auto max-w-4xl">
        <div className="prose max-w-full">
          <h1>Otevřený manuál pro online výuku</h1>
          <div className="text-center bg-gray-100 m-4 rounded-lg">
            <input
              className="shadow-md rounded-lg px-6 py-3 m-4 text-xl focus:shadow-lg transition-shadow max-w-md focus:outline-none w-full"
              placeholder="Hledat článek..."
              value={searchTerm}
              onInput={onSearch}
            />
          </div>
        </div>
      </div>
    </>
  );
}
