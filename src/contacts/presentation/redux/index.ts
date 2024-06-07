import AppError, { AppErrorType } from '@core/domain/entities/app_error';
import { createSlice } from '@reduxjs/toolkit';
import { initialState } from 'src/contacts/presentation/redux/state';
import { getContactsAsynkThunk } from 'src/contacts/presentation/redux/thunks';

const slice = createSlice({
  name: '/contacts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getContactsAsynkThunk.pending, state => {
        state.contacts = { type: 'loading' };
      })
      .addCase(getContactsAsynkThunk.rejected, (state, { payload }) => {
        state.contacts = {
          type: 'error',
          error: payload || new AppError(AppErrorType.UNKNOWN_ERROR),
        };
      })
      .addCase(getContactsAsynkThunk.fulfilled, (state, { payload }) => {
        state.contacts =
          payload.length > 0
            ? { type: 'success', data: payload }
            : { type: 'empty' };
      });
  },
});

export const contactsReducer = slice.reducer;
