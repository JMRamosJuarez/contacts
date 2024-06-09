import AppError, { AppErrorType } from '@core/domain/entities/app_error';
import { AppSelector, useAppSelector } from '@core/presentation/redux';
import { BaseState } from '@core/presentation/redux/state';
import PhoneNumber from '@native-modules/contacts/entities/phone_number';
import { createSelector } from '@reduxjs/toolkit';

const input: AppSelector<{ query: string }> = ({ searchReducer }) =>
  searchReducer.input;

export const useSearchInputValue = () => useAppSelector(input);

const search: AppSelector<BaseState<PhoneNumber[]>> = ({ searchReducer }) =>
  searchReducer.search;

const stateTypeSelector = createSelector(search, state => state.type);

export const useSearchPhoneNumbersState = () =>
  useAppSelector(stateTypeSelector);

const errorSelector = createSelector(search, state => {
  if (state.type === 'error') {
    return state.error;
  }
  return new AppError(AppErrorType.INVALID_STATE_ACCESS);
});

export const useSearchPhoneNumbersError = () => useAppSelector(errorSelector);

const dataSelector = createSelector(search, state => {
  if (state.type === 'success') {
    return state.data;
  }
  return [];
});

export const useSerchPhoneNumbersResults = () => useAppSelector(dataSelector);
