import { contactsReducer } from '@contacts/presentation/redux/contacts';
import { contactDetailsReducer } from '@contacts/presentation/redux/details';
import { searchReducer } from '@contacts/presentation/redux/search';
import { configureStore } from '@reduxjs/toolkit';

export const AppReduxStore = configureStore({
  reducer: {
    contactsReducer,
    contactDetailsReducer,
    searchReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {},
      },
      serializableCheck: false,
    }),
});
