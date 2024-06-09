import { BaseState } from '@core/presentation/redux/state';
import PhoneNumber from '@native-modules/contacts/entities/phone_number';

export type SearchPhoneNumbersState = {
  input: { query: string };
  search: BaseState<PhoneNumber[]>;
};

export const initialState: SearchPhoneNumbersState = {
  input: { query: '' },
  search: { type: 'waiting' },
};
