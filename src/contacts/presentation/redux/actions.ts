import { useCallback } from 'react';

import { useAppDispatch } from '@core/presentation/redux';
import ContactsRequest from '@native-modules/contacts/request';
import { debounce } from 'lodash';
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

export const useSearchContactsAction = () => {
  const dispatch = useAppDispatch();
  const callback = useCallback(
    (request: ContactsRequest) => {
      dispatch(getContactsAsynkThunk(request));
    },
    [dispatch],
  );
  return debounce(callback, 750);
};
