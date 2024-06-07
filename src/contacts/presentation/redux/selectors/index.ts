import AppError, { AppErrorType } from '@core/domain/entities/app_error';
import { AppSelector, useAppSelector } from '@core/presentation/redux';
import { BaseState } from '@core/presentation/redux/state';
import Contact from '@native-modules/contacts/contact';
import { createSelector } from '@reduxjs/toolkit';

const contacts: AppSelector<BaseState<Contact[]>> = ({ contactsReducer }) =>
  contactsReducer.contacts;

const stateSelector = createSelector(contacts, state => state.type);

export const useContactsState = () => useAppSelector(stateSelector);

const errorSelector = createSelector(contacts, state => {
  if (state.type === 'error') {
    return state.error;
  }
  return new AppError(AppErrorType.INVALID_STATE_ACCESS);
});

export const useContactsError = () => useAppSelector(errorSelector);

const dataSelector = createSelector(contacts, state => {
  if (state.type === 'success') {
    return state.data;
  }
  return [];
});

export const useContacts = () => useAppSelector(dataSelector);
