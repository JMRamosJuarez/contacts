import { BaseState } from '@core/presentation/redux/state';
import Contact from '@native-modules/contacts/contact';

export type ContactsState = {
  contacts: BaseState<Contact[]>;
};

export const initialState: ContactsState = {
  contacts: { type: 'waiting' },
};
