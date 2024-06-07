import AppError, { AppErrorType } from '@core/domain/entities/app_error';
import { createAppAsyncThunk } from '@core/presentation/redux/thunks';
import ContactsModule, { CONTACT_PERMISSIONS } from '@native-modules/contacts';
import Contact from '@native-modules/contacts/contact';
import {
  check as checkPermissions,
  request as requestPermissions,
} from 'react-native-permissions';

export const getContactsAsynkThunk = createAppAsyncThunk<undefined, Contact[]>(
  '/get_contacts',
  async _ => {
    const status = await checkPermissions(CONTACT_PERMISSIONS);
    switch (status) {
      case 'granted':
        return await ContactsModule.getContacts();
      case 'denied': {
        const result = await requestPermissions(CONTACT_PERMISSIONS);
        if (result === 'granted') {
          return await ContactsModule.getContacts();
        }
        throw new AppError(AppErrorType.PERMISSION_DENIED);
      }
      default:
        throw new AppError(AppErrorType.PERMISSION_DENIED);
    }
  },
);
