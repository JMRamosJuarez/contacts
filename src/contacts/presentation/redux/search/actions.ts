import { useCallback } from 'react';

import {
  clearSearchResults,
  updateSearchInput,
} from '@contacts/presentation/redux/search';
import { searchPhoneNumbersAsynkThunk } from '@contacts/presentation/redux/search/thunks';
import { useAppDispatch } from '@core/presentation/redux';
import { debounce } from 'lodash';

export const useUpdateSearchInputAction = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (query: string) => {
      dispatch(updateSearchInput(query));
    },
    [dispatch],
  );
};

export const useClearSearchResultsAction = () => {
  const dispatch = useAppDispatch();
  return useCallback(() => {
    dispatch(clearSearchResults());
  }, [dispatch]);
};

export const useSearchPhoneNumbersAction = () => {
  const dispatch = useAppDispatch();
  const callback = useCallback(
    (query: string) => {
      dispatch(searchPhoneNumbersAsynkThunk(query));
    },
    [dispatch],
  );
  return debounce(callback, 750);
};
