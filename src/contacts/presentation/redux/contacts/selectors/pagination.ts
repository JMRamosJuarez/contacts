import { PaginationState } from '@contacts/presentation/redux/contacts/state';
import { AppSelector, useAppSelector } from '@core/presentation/redux';

const pagination: AppSelector<PaginationState> = ({ contactsReducer }) =>
  contactsReducer.pagination.type;

export const usePaginationState = () => useAppSelector(pagination);
