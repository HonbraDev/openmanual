import orderPages from "../src/orderPages";
import metadata from "../src/metadata";

import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  const slug = orderPages(metadata)[0][0].slug;
  router.replace(`/${slug}`);
  return <></>;
};

export default Index;
