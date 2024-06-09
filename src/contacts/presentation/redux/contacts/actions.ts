import { useCallback } from 'react';

import {
  getContactsAsynkThunk,
  getContactsPageAsyncThunk,
} from '@contacts/presentation/redux/contacts/thunks';
import { useAppDispatch } from '@core/presentation/redux';
import ContactsRequest from '@native-modules/contacts/entities/request';

export const useGetContactsAction = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (request: ContactsRequest) => {
      dispatch(getContactsAsynkThunk(request));
    },
    [dispatch],
  );
};

export const useGetContactsPageAction = () => {
  const dispatch = useAppDispatch();
  return useCallback(() => {
    dispatch(getContactsPageAsyncThunk());
  }, [dispatch]);
};
