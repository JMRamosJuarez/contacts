import React from 'react';

import ContactDetailHeader from '@contacts/presentation/components/ContactDetailHeader';
import ContactsHeader from '@contacts/presentation/components/ContactsHeader';
import PhoneNumbersSearchInput from '@contacts/presentation/components/SearchInput';
import ContactDetailScreen from '@contacts/presentation/screens/Detail';
import ContactsScreen from '@contacts/presentation/screens/Main';
import SearchPhoneNumbersScreen from '@contacts/presentation/screens/Search';
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
          cardStyleInterpolator: ({ current }) => ({
            cardStyle: {
              opacity: current.progress,
            },
          }),
        }}>
        <AppNavigationStack.Screen
          name={'Main'}
          options={{
            header: ContactsHeader,
          }}
          component={ContactsScreen}
        />
        <AppNavigationStack.Screen
          name={'Search'}
          options={{
            header: PhoneNumbersSearchInput,
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          }}
          component={SearchPhoneNumbersScreen}
        />
        <AppNavigationStack.Screen
          name={'ContactDetail'}
          options={({
            route: {
              params: { contact },
            },
          }) => ({
            title: contact.name,
            header: ContactDetailHeader,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          })}
          component={ContactDetailScreen}
        />
      </AppNavigationStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
