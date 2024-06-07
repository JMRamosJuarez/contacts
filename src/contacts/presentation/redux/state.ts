import { BaseState } from '@core/presentation/redux/state';
import ContactsGroup from '@native-modules/contacts/group';

export type ContactsState = {
  contacts: BaseState<ContactsGroup[]>;
};

export const initialState: ContactsState = {
  contacts: { type: 'waiting' },
};
