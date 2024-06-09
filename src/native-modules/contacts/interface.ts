import Contact from '@native-modules/contacts/entities/contact';
import PhoneNumber from '@native-modules/contacts/entities/phone_number';
import ContactsRequest from '@native-modules/contacts/entities/request';
import { NativeModules } from 'react-native';

const { ContactsModule } = NativeModules;

interface ContactsInterface {
  getContacts(request: ContactsRequest): Promise<Contact[]>;

  getPhoneNumbers(request: {
    readonly contactId: number;
  }): Promise<PhoneNumber[]>;

  searchPhoneNumbers(request: {
    readonly query: string;
  }): Promise<PhoneNumber[]>;
}

export default ContactsModule as ContactsInterface;
