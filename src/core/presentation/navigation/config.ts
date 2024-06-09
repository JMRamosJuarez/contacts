import Contact from '@native-modules/contacts/entities/contact';
import { RouteProp, useNavigation } from '@react-navigation/native';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';

export type AppStackParams = {
  Main: undefined;
  Search: undefined;
  ContactDetail: { readonly contact: Contact };
};

export type ContactDetailRouteProp = RouteProp<AppStackParams, 'ContactDetail'>;

export const AppNavigationStack = createStackNavigator<AppStackParams>();

export type AppNavigationProp = StackNavigationProp<AppStackParams>;

export const useAppNavigation = () => useNavigation<AppNavigationProp>();
