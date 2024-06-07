import Contact from '@native-modules/contacts/contact';
import ContactsRequest from '@native-modules/contacts/request';
import { NativeModules, Platform } from 'react-native';
import { PERMISSIONS } from 'react-native-permissions';

const { ContactsModule } = NativeModules;

export const CONTACT_PERMISSIONS = Platform.select({
  android: PERMISSIONS.ANDROID.READ_CONTACTS,
  ios: PERMISSIONS.IOS.CONTACTS,
  default: PERMISSIONS.ANDROID.READ_CONTACTS,
});

interface ContactsInterface {
  getContacts(request: ContactsRequest): Promise<Contact[]>;
}

export default ContactsModule as ContactsInterface;
