import React, { createContext, useState } from 'react';

import { Appearance } from 'react-native';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const colorScheme = Appearance.getColorScheme();
  // colorScheme = 'dark';
  const [theme, setTheme] = useState(colorScheme);

  const toggleTheme = () => {
    if (!theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
