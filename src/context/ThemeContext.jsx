import { createContext, useContext, useState, useMemo } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export function ThemeProviderWrapper({ children }) {
  const [mode, setMode] = useState('dark'); // По умолчанию темная

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'dark' 
            ? {
                background: {
                  default: '#1b1b1b',
                  primary: '#000000',
                  secondary: '#262626',
                  grey:'#999999'
                },
                text: {
                  primary: '#f4f4f4',
                  secondary: '#d1d1d1',
                  default: '#ffffff',
                },
              }
            : {
                background: {
                  default: '#f5f5f5',
                  primary: '#ffffff',
                  grey:'#666666'
                },
                text: {
                  primary: '#333333',
                  secondary: '#666666',
                },
              }),
        },
      }),
    [mode],
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}