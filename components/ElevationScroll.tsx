import { useScrollTrigger } from "@mui/material";

import type { ReactElement } from "react";

const ElevationScroll = ({
  children,
}: {
  children: (elevated: boolean) => ReactElement;
}) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: process.browser ? window : undefined,
  });

  return children(trigger);
};

export default ElevationScroll;
