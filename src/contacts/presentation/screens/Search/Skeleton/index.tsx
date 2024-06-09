import React, { useCallback, useMemo } from 'react';

import SearchResultListItemSkeleton from '@contacts/presentation/components/SearchResultListItemSkeleton';
import { styles } from '@contacts/presentation/screens/Search/Skeleton/styles';
import { FlatList } from 'react-native';

const SearchResultsSkeleton: React.FC = () => {
  const data = useMemo(() => new Array(25).fill({}), []);

  const renderItem = useCallback((): React.ReactElement => {
    return <SearchResultListItemSkeleton />;
  }, []);

  return (
    <FlatList
      style={styles.container}
      data={data}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      keyExtractor={(_, index) => `${index}`}
      renderItem={renderItem}
    />
  );
};

export default SearchResultsSkeleton;
