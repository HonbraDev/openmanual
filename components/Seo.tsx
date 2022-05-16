// https://github.com/HonbraDev/honbra-web/blob/master/src/components/Layout.tsx

import Head from "next/head";

import { useRouter } from "next/router";

const Seo = ({ title }: { title: string }) => {
  const router = useRouter();
  const siteName = "OpenManual";
  const pageTitle = `${title} - ${siteName}`;
  const domain = "openmanual.honbra.com";
  const canonicalUrl = `https://${domain}/${router.asPath}`;
  return (
    <Head>
      {/* Title & name */}
      <title>{pageTitle}</title>
      <meta property="og:title" content={title} />
      <meta property="twitter:title" content={pageTitle} />
      <meta property="og:site_name" content={siteName} />

      {/* URL */}
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:domain" content={domain} />

      {/* Yup, it's a website */}
      <meta property="og:type" content="website" />
    </Head>
  );
};

export default Seo;
