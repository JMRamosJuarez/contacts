import { initialState } from '@contacts/presentation/redux/search/state';
import { searchPhoneNumbersAsynkThunk } from '@contacts/presentation/redux/search/thunks';
import AppError, { AppErrorType } from '@core/domain/entities/app_error';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: '/search',
  initialState,
  reducers: {
    updateSearchInput: (state, { payload }: PayloadAction<string>) => {
      state.input = { query: payload };
    },
    clearSearchResults: state => {
      state.input = { query: '' };
      state.search = { type: 'waiting' };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(searchPhoneNumbersAsynkThunk.pending, state => {
        state.search = {
          type: 'loading',
        };
      })
      .addCase(searchPhoneNumbersAsynkThunk.rejected, (state, { payload }) => {
        state.search = {
          type: 'error',
          error: payload || new AppError(AppErrorType.UNKNOWN_ERROR),
        };
      })
      .addCase(searchPhoneNumbersAsynkThunk.fulfilled, (state, { payload }) => {
        state.search =
          payload.length > 0
            ? {
                type: 'success',
                data: payload,
              }
            : { type: 'empty' };
      });
  },
});

export const { updateSearchInput, clearSearchResults } = slice.actions;

export const searchReducer = slice.reducer;
