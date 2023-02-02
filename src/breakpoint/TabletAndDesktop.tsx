import React, {PropsWithChildren} from 'react';
import useBreakpoint from 'use-breakpoint';
import {breakpoints} from './Mobile';

const TabletAndDesktop: React.FC<PropsWithChildren> = ({children}) => {
  const {breakpoint} = useBreakpoint(breakpoints, 'desktop');

  if (breakpoint === 'mobile') {
    return null;
  }

  return <>{children}</>;
};

export default TabletAndDesktop;
