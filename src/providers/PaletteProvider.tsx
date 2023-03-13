import React, {createContext, PropsWithChildren} from 'react';
import {createTheme, PaletteMode, ThemeProvider} from '@mui/material';

interface IProps {
  mode: PaletteMode;
  setMode?: (mode: PaletteMode) => void;
}

type Props = IProps & PropsWithChildren;

export const PaletteContext = createContext<IProps>({mode: 'light', setMode: undefined});

const PaletteProvider: React.FC<Props> = ({mode, setMode, children}) => {
  const palette = createTheme({
    palette: {
      mode,
    },
  });

  return (
    <PaletteContext.Provider value={{mode, setMode}}>
      <ThemeProvider theme={palette}>{children}</ThemeProvider>
    </PaletteContext.Provider>
  );
};

export default PaletteProvider;
