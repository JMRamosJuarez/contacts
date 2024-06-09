import { PhoneNumbersState } from '@contacts/presentation/redux/contacts/state';
import AppError, { AppErrorType } from '@core/domain/entities/app_error';
import { AppSelector, useAppSelector } from '@core/presentation/redux';
import { createSelector } from '@reduxjs/toolkit';
import { shallowEqual } from 'react-redux';

const contactIdSelector: AppSelector<number, { readonly contactId: number }> = (
  _,
  { contactId },
) => contactId;

const phoneNumbersSelector: AppSelector<PhoneNumbersState> = ({
  contactDetailsReducer,
}) => contactDetailsReducer.phoneNumbers;

const baseStateSelector = createSelector(
  contactIdSelector,
  phoneNumbersSelector,
  (key, data) => {
    return data[key] || { type: 'waiting' };
  },
);

const stateTypeSelector = createSelector(
  baseStateSelector,
  state => state.type,
);

export const usePhoneNumbersState = (contactId: number) =>
  useAppSelector(
    appState => stateTypeSelector(appState, { contactId }),
    shallowEqual,
  );

const dataSelector = createSelector(baseStateSelector, state => {
  if (state.type === 'success') {
    return state.data;
  }
  return [];
});

export const usePhoneNumbers = (contactId: number) =>
  useAppSelector(appState => dataSelector(appState, { contactId }));

const errorSelector = createSelector(baseStateSelector, state => {
  if (state.type === 'error') {
    return state.error;
  }
  return new AppError(AppErrorType.INVALID_STATE_ACCESS);
});

export const usePhoneNumbersError = (contactId: number) =>
  useAppSelector(appState => errorSelector(appState, { contactId }));
