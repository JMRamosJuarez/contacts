import React from 'react';

import { styles } from '@contacts/presentation/components/SectionHeader/styles';
import { useAppTheme } from '@theme/index';
import { Text, View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

const SectionHeader: React.FC<{
  readonly icon: string;
  readonly title: string;
}> = ({ icon, title }) => {
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.primary['800'],
        },
      ]}>
      <FeatherIcon
        size={24}
        name={icon}
        color={colors.primary['50']}
        style={styles.icon}
      />
      <Text
        style={[
          styles.title,
          {
            color: colors.primary['50'],
          },
        ]}>
        {title}
      </Text>
    </View>
  );
};

export default SectionHeader;
