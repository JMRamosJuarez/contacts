import { createAppAsyncThunk } from '@core/presentation/redux/thunks';
import { getPhoneNumbers } from '@native-modules/contacts';
import PhoneNumber from '@native-modules/contacts/entities/phone_number';

export const getPhoneNumbersAsynkThunk = createAppAsyncThunk<
  number,
  PhoneNumber[]
>('/get-phone-numbers', async request => {
  return await getPhoneNumbers(request);
});
