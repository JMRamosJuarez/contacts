import { useCallback } from 'react';

import { getPhoneNumbersAsynkThunk } from '@contacts/presentation/redux/details/thunks';
import { useAppDispatch } from '@core/presentation/redux';

export const useGetPhoneNumbersAction = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (request: number) => {
      dispatch(getPhoneNumbersAsynkThunk(request));
    },
    [dispatch],
  );
};
