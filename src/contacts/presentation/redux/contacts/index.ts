import { initialState } from '@contacts/presentation/redux/contacts/state';
import {
  getContactsAsynkThunk,
  getContactsPageAsyncThunk,
} from '@contacts/presentation/redux/contacts/thunks';
import AppError, { AppErrorType } from '@core/domain/entities/app_error';
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: '/contacts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getContactsAsynkThunk.pending, state => {
        state.pagination.type = 'loading';
        state.contacts = { type: 'loading' };
      })
      .addCase(getContactsAsynkThunk.rejected, (state, { payload }) => {
        state.pagination.type = 'error';
        state.contacts = {
          type: 'error',
          error: payload || new AppError(AppErrorType.UNKNOWN_ERROR),
        };
      })
      .addCase(
        getContactsAsynkThunk.fulfilled,
        (state, { meta: { arg }, payload }) => {
          state.pagination = {
            type: 'success',
            page: arg.page + 1,
            limit: arg.limit,
          };
          state.contacts =
            payload.length > 0
              ? { type: 'success', data: payload }
              : { type: 'empty' };
        },
      );

    builder
      .addCase(getContactsPageAsyncThunk.pending, state => {
        state.pagination.type = 'loading';
      })
      .addCase(getContactsPageAsyncThunk.rejected, state => {
        state.pagination.type = 'error';
      })
      .addCase(getContactsPageAsyncThunk.fulfilled, (state, { payload }) => {
        const current =
          state.contacts.type === 'success' ? state.contacts.data : [];

        const data = [...current, ...payload];

        state.contacts =
          data.length > 0 ? { type: 'success', data } : { type: 'empty' };

        state.pagination.type = 'success';
        state.pagination.page += 1;
      });
  },
});

export const contactsReducer = slice.reducer;
