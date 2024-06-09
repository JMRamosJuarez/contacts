import React from 'react';

import { styles } from '@contacts/presentation/components/SearchResultListItemSkeleton/styles';
import Skeleton from '@core/presentation/components/Skeleton';
import { useAppTheme } from '@theme/index';
import { Image, View } from 'react-native';

const SearchResultListItemSkeleton: React.FC = () => {
  const { colors } = useAppTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: colors.primary['800'] }]}>
      <Image
        style={styles.img}
        source={require('@assets/imgs/contact-placeholder.png')}
      />
      <View style={styles.data}>
        <Skeleton width={220} height={16} style={styles.name} />
        <Skeleton width={100} height={14} style={styles.phone} />
        <Skeleton width={120} height={14} style={styles.phone} />
      </View>
    </View>
  );
};

export default SearchResultListItemSkeleton;
