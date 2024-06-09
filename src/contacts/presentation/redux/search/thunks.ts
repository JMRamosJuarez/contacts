import { createAppAsyncThunk } from '@core/presentation/redux/thunks';
import { searchPhoneNumbers } from '@native-modules/contacts';
import PhoneNumber from '@native-modules/contacts/entities/phone_number';

export const searchPhoneNumbersAsynkThunk = createAppAsyncThunk<
  string,
  PhoneNumber[]
>('/search-phone-numbers', async request => {
  return await searchPhoneNumbers(request);
});
