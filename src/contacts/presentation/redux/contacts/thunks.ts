import { createAppAsyncThunk } from '@core/presentation/redux/thunks';
import { getContacts } from '@native-modules/contacts';
import Contact from '@native-modules/contacts/entities/contact';
import ContactsRequest from '@native-modules/contacts/entities/request';

export const getContactsAsynkThunk = createAppAsyncThunk<
  ContactsRequest,
  Contact[]
>('/get-contacts', async request => {
  return await getContacts(request);
});

export const getContactsPageAsyncThunk = createAppAsyncThunk<void, Contact[]>(
  '/get-contacts-page',
  async (_, { getState }) => {
    const {
      pagination: { page, limit },
    } = getState().contactsReducer;
    return await getContacts({ page, limit });
  },
  {
    condition: async (_, { getState }) => {
      //@ts-ignore
      const { pagination } = getState().contactsReducer;
      return pagination.type !== 'loading';
    },
  },
);
