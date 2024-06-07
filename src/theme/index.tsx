import React, { PropsWithChildren, createContext, useContext } from 'react';

import AppColors, { colors } from '@theme/colors';
import { StatusBar } from 'react-native';

export interface AppTheme {
  readonly colors: AppColors;
}

const theme: AppTheme = {
  colors,
};

const AppThemeContext = createContext<AppTheme>(theme);

export const AppThemeProvider: React.FC<PropsWithChildren> = ({ children }) => (
  <AppThemeContext.Provider value={theme}>
    <StatusBar
      translucent
      barStyle={'light-content'}
      backgroundColor={'transparent'}
    />
    {children}
  </AppThemeContext.Provider>
);

export const useAppTheme = () => useContext(AppThemeContext);
