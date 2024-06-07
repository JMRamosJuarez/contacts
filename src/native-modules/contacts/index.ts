import { NativeModules, Platform } from 'react-native';
import { PERMISSIONS } from 'react-native-permissions';

import Contact from './contact';

const { ContactsModule } = NativeModules;

export const CONTACT_PERMISSIONS = Platform.select({
  android: PERMISSIONS.ANDROID.READ_CONTACTS,
  ios: PERMISSIONS.IOS.CONTACTS,
  default: PERMISSIONS.ANDROID.READ_CONTACTS,
});

interface ContactsInterface {
  getContacts(): Promise<Contact[]>;
}

export default ContactsModule as ContactsInterface;
