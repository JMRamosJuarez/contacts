import AppError, { AppErrorType } from '@core/domain/entities/app_error';
import ContactsRequest from '@native-modules/contacts/entities/request';
import ContactsModule from '@native-modules/contacts/interface';
import { Platform } from 'react-native';
import {
  PERMISSIONS,
  check as checkPermissions,
  request as requestPermissions,
} from 'react-native-permissions';

export const READ_CONTACTS_PERMISSIONS = Platform.select({
  android: PERMISSIONS.ANDROID.READ_CONTACTS,
  ios: PERMISSIONS.IOS.CONTACTS,
  default: PERMISSIONS.ANDROID.READ_CONTACTS,
});

export const getContact = async (contactId: number) => {
  const status = await checkPermissions(READ_CONTACTS_PERMISSIONS);
  switch (status) {
    case 'granted': {
      return await ContactsModule.getContact({ contactId });
    }
    case 'denied': {
      const result = await requestPermissions(READ_CONTACTS_PERMISSIONS);
      if (result === 'granted') {
        return await ContactsModule.getContact({ contactId });
      }
      throw new AppError(AppErrorType.PERMISSION_DENIED);
    }
    default:
      throw new AppError(AppErrorType.PERMISSION_DENIED);
  }
};

export const getContacts = async (request: ContactsRequest) => {
  const status = await checkPermissions(READ_CONTACTS_PERMISSIONS);
  switch (status) {
    case 'granted': {
      return await ContactsModule.getContacts(request);
    }
    case 'denied': {
      const result = await requestPermissions(READ_CONTACTS_PERMISSIONS);
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
  const status = await checkPermissions(READ_CONTACTS_PERMISSIONS);
  switch (status) {
    case 'granted': {
      return await ContactsModule.getPhoneNumbers({ contactId });
    }
    case 'denied': {
      const result = await requestPermissions(READ_CONTACTS_PERMISSIONS);
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
  const status = await checkPermissions(READ_CONTACTS_PERMISSIONS);
  switch (status) {
    case 'granted': {
      return await ContactsModule.searchPhoneNumbers({ query });
    }
    case 'denied': {
      const result = await requestPermissions(READ_CONTACTS_PERMISSIONS);
      if (result === 'granted') {
        return await ContactsModule.searchPhoneNumbers({ query });
      }
      throw new AppError(AppErrorType.PERMISSION_DENIED);
    }
    default:
      throw new AppError(AppErrorType.PERMISSION_DENIED);
  }
};
