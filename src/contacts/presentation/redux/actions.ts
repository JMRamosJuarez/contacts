import { useCallback } from 'react';

import { useAppDispatch } from '@core/presentation/redux';
import ContactsRequest from '@native-modules/contacts/request';
import { getContactsAsynkThunk } from 'src/contacts/presentation/redux/thunks';

export const useGetContactsAction = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (request: ContactsRequest) => {
      dispatch(getContactsAsynkThunk(request));
    },
    [dispatch],
  );
};
