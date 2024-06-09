import AppError, { AppErrorType } from '@core/domain/entities/app_error';
import ContactsRequest from '@native-modules/contacts/entities/request';
import ContactsModule from '@native-modules/contacts/interface';
import { Platform } from 'react-native';
import {
  PERMISSIONS,
  check as checkPermissions,
  request as requestPermissions,
} from 'react-native-permissions';

export const CONTACT_PERMISSIONS = Platform.select({
  android: PERMISSIONS.ANDROID.READ_CONTACTS,
  ios: PERMISSIONS.IOS.CONTACTS,
  default: PERMISSIONS.ANDROID.READ_CONTACTS,
});

// const groupContacts = (contacts: Contact[]): ContactsGroup[] => {
//   const groupsHolder: { [key: string]: Contact[] } = {};

//   const values = contacts.reduce((holder, item) => {
//     const title = item.name.charAt(0).toUpperCase();

//     if (!holder[title]) {
//       holder[title] = [];
//     }

//     holder[title].push(item);

//     return holder;
//   }, groupsHolder);

//   const groups: ContactsGroup[] = Object.keys(values).map(title => ({
//     title,
//     data: values[title],
//   }));

//   return groups;
// };

export const getContacts = async (request: ContactsRequest) => {
  const status = await checkPermissions(CONTACT_PERMISSIONS);
  switch (status) {
    case 'granted': {
      return await ContactsModule.getContacts(request);
    }
    case 'denied': {
      const result = await requestPermissions(CONTACT_PERMISSIONS);
      if (result === 'granted') {
        return await ContactsModule.getContacts(request);
      }
      throw new AppError(AppErrorType.PERMISSION_DENIED);
    }
    default:
      throw new AppError(AppErrorType.PERMISSION_DENIED);
  }
};

export const getPhoneNumbers = async (contactId: number) => {
  const status = await checkPermissions(CONTACT_PERMISSIONS);
  switch (status) {
    case 'granted': {
      return await ContactsModule.getPhoneNumbers({ contactId });
    }
    case 'denied': {
      const result = await requestPermissions(CONTACT_PERMISSIONS);
      if (result === 'granted') {
        return await ContactsModule.getPhoneNumbers({ contactId });
      }
      throw new AppError(AppErrorType.PERMISSION_DENIED);
    }
    default:
      throw new AppError(AppErrorType.PERMISSION_DENIED);
  }
};

export const searchPhoneNumbers = async (query: string) => {
  const status = await checkPermissions(CONTACT_PERMISSIONS);
  switch (status) {
    case 'granted': {
      return await ContactsModule.searchPhoneNumbers({ query });
    }
    case 'denied': {
      const result = await requestPermissions(CONTACT_PERMISSIONS);
      if (result === 'granted') {
        return await ContactsModule.searchPhoneNumbers({ query });
      }
      throw new AppError(AppErrorType.PERMISSION_DENIED);
    }
    default:
      throw new AppError(AppErrorType.PERMISSION_DENIED);
  }
};
