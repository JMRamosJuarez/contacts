import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from 'src/contacts/presentation/redux';

export const AppReduxStore = configureStore({
  reducer: {
    contactsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {},
      },
      serializableCheck: false,
    }),
});
