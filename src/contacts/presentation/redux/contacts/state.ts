import { BaseState } from '@core/presentation/redux/state';
import Contact from '@native-modules/contacts/entities/contact';
import PhoneNumber from '@native-modules/contacts/entities/phone_number';

export type PhoneNumbersState = {
  [contactId: number]: BaseState<PhoneNumber[]>;
};

export type PaginationState = 'waiting' | 'loading' | 'error' | 'success';

export type ContactsState = {
  pagination: {
    type: PaginationState;
    page: number;
    limit: number;
  };

  contacts: BaseState<Contact[]>;

  phoneNumbers: PhoneNumbersState;
};

export const initialState: ContactsState = {
  pagination: { type: 'waiting', page: 0, limit: 25 },

  contacts: { type: 'waiting' },

  phoneNumbers: {},
};
