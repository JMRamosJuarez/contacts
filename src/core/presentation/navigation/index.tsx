import React from 'react';

import { AppNavigationStack } from '@core/presentation/navigation/config';
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators } from '@react-navigation/stack';
import { View } from 'react-native';

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <AppNavigationStack.Navigator
        initialRouteName={'Main'}
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: ({ current }) => ({
            cardStyle: {
              opacity: current.progress,
            },
          }),
        }}>
        <AppNavigationStack.Screen name={'Main'} component={View} />
        <AppNavigationStack.Screen
          name={'ContactDetail'}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
          component={View}
        />
      </AppNavigationStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
