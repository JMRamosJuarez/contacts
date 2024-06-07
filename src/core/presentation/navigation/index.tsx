import React from 'react';

import ContactDetailScreen from '@contacts/presentation/screens/Detail';
import ContactsScreen from '@contacts/presentation/screens/Main';
import { AppNavigationStack } from '@core/presentation/navigation/config';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators } from '@react-navigation/stack';
import { useAppTheme } from '@theme/index';

const AppNavigator: React.FC = () => {
  const { colors } = useAppTheme();
  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: colors.primary['900'],
        },
      }}>
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
        <AppNavigationStack.Screen name={'Main'} component={ContactsScreen} />
        <AppNavigationStack.Screen
          name={'ContactDetail'}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
          component={ContactDetailScreen}
        />
      </AppNavigationStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
