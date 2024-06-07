import { useCallback } from 'react';

import { useAppDispatch } from '@core/presentation/redux';
import { getContactsAsynkThunk } from 'src/contacts/presentation/redux/thunks';

export const useGetContactsAction = () => {
  const dispatch = useAppDispatch();
  return useCallback(() => {
    dispatch(getContactsAsynkThunk());
  }, [dispatch]);
};
