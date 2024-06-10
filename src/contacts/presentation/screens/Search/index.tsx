import React, { useEffect } from 'react';

import { useClearSearchResultsAction } from '@contacts/presentation/redux/search/actions';
import { useSearchPhoneNumbersState } from '@contacts/presentation/redux/search/selectors';
import EmptySearchResults from '@contacts/presentation/screens/Search/Empty';
import SearchContactsError from '@contacts/presentation/screens/Search/Error';
import SearchResultsList from '@contacts/presentation/screens/Search/List';
import SearchResultsSkeleton from '@contacts/presentation/screens/Search/Skeleton';

const SearchPhoneNumbersScreen: React.FC = () => {
  const state = useSearchPhoneNumbersState();

  const clear = useClearSearchResultsAction();

  useEffect(() => {
    return clear;
  }, [clear]);

  switch (state) {
    case 'loading':
      return <SearchResultsSkeleton />;
    case 'success':
      return <SearchResultsList />;
    case 'empty':
      return <EmptySearchResults />;
    default:
      return <SearchContactsError />;
  }
};

export default SearchPhoneNumbersScreen;
