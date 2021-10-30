import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(event.target.value);

  return (
    <>
      <Link href="/articles/jak_poridit_snimek_obrazovky">
        <a>Jediný článek</a>
      </Link>
    </>
  );
}
