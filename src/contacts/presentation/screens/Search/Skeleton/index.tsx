import React, { useCallback, useMemo } from 'react';

import PhoneNumberListItemSkeleton from '@contacts/presentation/components/PhoneNumberListItemSkeleton';
import { styles } from '@contacts/presentation/screens/Search/Skeleton/styles';
import { FlatList } from 'react-native';

const SearchResultsSkeleton: React.FC = () => {
  const data = useMemo(() => new Array(25).fill({}), []);

  const renderItem = useCallback((): React.ReactElement => {
    return <PhoneNumberListItemSkeleton />;
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
