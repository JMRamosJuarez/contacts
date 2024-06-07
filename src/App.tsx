import React from 'react';

import AppNavigator from '@core/presentation/navigation';
import AppReduxProvider from '@core/presentation/redux/provider';

const App: React.FC = () => {
  return (
    <AppReduxProvider>
      <AppNavigator />
    </AppReduxProvider>
  );
};

export default App;
