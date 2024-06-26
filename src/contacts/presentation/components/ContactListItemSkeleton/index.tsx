import React from 'react';

import { styles } from '@contacts/presentation/components/ContactListItemSkeleton/styles';
import Skeleton from '@core/presentation/components/Skeleton';
import { useAppTheme } from '@theme/index';
import { Image, View } from 'react-native';

const ContactListItemSkeleton: React.FC = () => {
  const { colors } = useAppTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: colors.primary['800'] }]}>
      <Image
        style={styles.img}
        source={require('@assets/imgs/contact-placeholder.png')}
      />
      <Skeleton width={220} height={16} style={styles.skeleton} />
    </View>
  );
};

export default ContactListItemSkeleton;
