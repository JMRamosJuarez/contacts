import React, { useMemo } from 'react';

import { styles } from '@contacts/presentation/components/PaginationItemSkeleton/styles';
import { usePaginationState } from '@contacts/presentation/redux/contacts/selectors/pagination';
import Skeleton from '@core/presentation/components/Skeleton';
import { useAppTheme } from '@theme/index';
import { Image, View } from 'react-native';

const PaginationItemSkeleton: React.FC = () => {
  const { colors } = useAppTheme();

  const state = usePaginationState();

  const opacity = useMemo(() => (state === 'loading' ? 1 : 0), [state]);

  return (
    <View
      style={[
        styles.container,
        {
          opacity,
          backgroundColor: colors.primary['800'],
        },
      ]}>
      <Image
        style={styles.img}
        source={require('@assets/imgs/contact-placeholder.png')}
      />
      <Skeleton width={220} height={16} style={styles.skeleton} />
    </View>
  );
};

export default PaginationItemSkeleton;
