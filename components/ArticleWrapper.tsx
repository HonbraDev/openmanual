import Link from "next/link";

export default function ArticleWrapper({ children }: { children: any }) {
  return (
    <>
      <div className="mt-6 pb-4 px-6 mx-auto max-w-4xl border-b border-gray-300">
        <Link href="/">
          <h1 className=" text-2xl font-light cursor-pointer">OpenManual</h1>
        </Link>
      </div>
      <div className="prose article my-8 px-8 mx-auto max-w-4xl overflow-hidden">
        {children}
      </div>
    </>
  );
}
