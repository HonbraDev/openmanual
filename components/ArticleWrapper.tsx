export default function ArticleWrapper({ children }: { children: any }) {
  return <div className="prose article my-8 px-8 mx-auto max-w-4xl overflow-hidden">{children}</div>;
}
