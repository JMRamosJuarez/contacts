import AppError, { AppErrorType } from '@core/domain/entities/app_error';
import { createAppAsyncThunk } from '@core/presentation/redux/thunks';
import ContactsModule, { CONTACT_PERMISSIONS } from '@native-modules/contacts';
import Contact from '@native-modules/contacts/contact';
import ContactsGroup from '@native-modules/contacts/group';
import {
  check as checkPermissions,
  request as requestPermissions,
} from 'react-native-permissions';

const groupContacts = (contacts: Contact[]): ContactsGroup[] => {
  const groupsHolder: { [key: string]: Contact[] } = {};

  const values = contacts.reduce((holder, item) => {
    const title = item.name.charAt(0).toUpperCase();

    if (!holder[title]) {
      holder[title] = [];
    }

    holder[title].push(item);

    return holder;
  }, groupsHolder);

  const groups: ContactsGroup[] = Object.keys(values).map(title => ({
    title,
    data: values[title],
  }));

  return groups;
};

export const getContactsAsynkThunk = createAppAsyncThunk<
  undefined,
  ContactsGroup[]
>('/get_contacts', async _ => {
  const status = await checkPermissions(CONTACT_PERMISSIONS);
  switch (status) {
    case 'granted': {
      const contacts = await ContactsModule.getContacts();
      return groupContacts(contacts);
    }
    case 'denied': {
      const result = await requestPermissions(CONTACT_PERMISSIONS);
      if (result === 'granted') {
        const contacts = await ContactsModule.getContacts();
        return groupContacts(contacts);
      }
      throw new AppError(AppErrorType.PERMISSION_DENIED);
    }
    default:
      throw new AppError(AppErrorType.PERMISSION_DENIED);
  }
});
