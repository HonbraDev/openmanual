import { useScrollTrigger } from "@mui/material";

import type { ReactElement } from "react";

/**
 * Renders a scroll trigger that will change a prop to true when the user scrolls
 * @param props The children to wrap in the trigger
 * @returns The children wrapped in the trigger
 */
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
