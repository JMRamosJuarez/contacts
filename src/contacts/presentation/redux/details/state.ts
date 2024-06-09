import { BaseState } from '@core/presentation/redux/state';
import PhoneNumber from '@native-modules/contacts/entities/phone_number';

export type PhoneNumbersState = {
  [contactId: number]: BaseState<PhoneNumber[]>;
};

export type ContactDetailsState = {
  phoneNumbers: PhoneNumbersState;
};

export const initialState: ContactDetailsState = {
  phoneNumbers: {},
};
