import React from 'react';

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
        {
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 12,
          paddingHorizontal: 8,
          marginVertical: 0.5,
        },
        {
          backgroundColor: colors.primary['800'],
        },
      ]}>
      <FeatherIcon
        size={24}
        name={icon}
        color={colors.primary['50']}
        style={{ marginHorizontal: 8 }}
      />
      <Text
        style={[
          {
            flex: 1,
            fontSize: 16,
            lineHeight: 24,
            marginHorizontal: 8,
          },
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
