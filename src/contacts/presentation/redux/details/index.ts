import { initialState } from '@contacts/presentation/redux/details/state';
import { getPhoneNumbersAsynkThunk } from '@contacts/presentation/redux/details/thunks';
import AppError, { AppErrorType } from '@core/domain/entities/app_error';
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: '/details',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        getPhoneNumbersAsynkThunk.rejected,
        (state, { meta: { arg }, payload }) => {
          state.phoneNumbers[arg] = {
            type: 'error',
            error: payload || new AppError(AppErrorType.UNKNOWN_ERROR),
          };
        },
      )
      .addCase(
        getPhoneNumbersAsynkThunk.fulfilled,
        (state, { meta: { arg }, payload }) => {
          state.phoneNumbers[arg] =
            payload.length > 0
              ? {
                  type: 'success',
                  data: payload,
                }
              : { type: 'empty' };
        },
      );
  },
});

export const contactDetailsReducer = slice.reducer;
