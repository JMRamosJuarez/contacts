import React from 'react';

import { styles } from '@contacts/presentation/components/PhoneNumberListItemSkeleton/styles';
import Skeleton from '@core/presentation/components/Skeleton';
import { useAppTheme } from '@theme/index';
import { View } from 'react-native';

const PhoneNumberListItemSkeleton: React.FC = () => {
  const { colors } = useAppTheme();
  return (
    <View
      style={[{ backgroundColor: colors.secondary['900'] }, styles.container]}>
      <Skeleton width={200} height={14} style={styles.skeleton} />
    </View>
  );
};

export default PhoneNumberListItemSkeleton;
