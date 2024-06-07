import { NativeModules } from 'react-native';

import Contact from './contact';

const { ContactsModule } = NativeModules;

interface ContactsInterface {
  getContacts(): Promise<Contact[]>;
}

export default ContactsModule as ContactsInterface;
