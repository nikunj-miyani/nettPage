import React from 'react';
import MainStack from './navigation/MainStack';
import { ThemeProvider } from './utils/ThemeManager';
import { Provider } from 'react-redux'
import SettingsProvider from './utils/SettingProvider'
import Store from './utils/Store'
export default function app() {
  return (
    <Provider store={Store}>
      <ThemeProvider>
        <SettingsProvider>
          <MainStack />
        </SettingsProvider>
      </ThemeProvider>
    </Provider>
  );
}
