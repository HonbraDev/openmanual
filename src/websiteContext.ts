import { createContext } from "react";
import { ArticlePreview } from "./articleTools";

const websiteContext = createContext<{ pages: ArticlePreview[] }>({
  pages: [],
});

export default websiteContext;

/* 
Article previews
Current article
Current route
*/
