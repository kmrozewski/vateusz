import React, {PropsWithChildren} from 'react';
import useBreakpoint from 'use-breakpoint';

export const breakpoints = {mobile: 0, tablet: 768, desktop: 1280};

const Mobile: React.FC<PropsWithChildren> = ({children}) => {
  const {breakpoint} = useBreakpoint(breakpoints, 'desktop');

  if (breakpoint !== 'mobile') {
    return null;
  }

  return <>{children}</>;
};

export default Mobile;
