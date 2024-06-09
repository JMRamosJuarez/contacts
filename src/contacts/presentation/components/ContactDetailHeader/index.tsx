import React from 'react';

import ArrowLeftIcon from '@assets/svg/arrow-left.svg';
import { styles } from '@contacts/presentation/components/ContactDetailHeader/styles';
import { StackHeaderProps } from '@react-navigation/stack';
import { useAppTheme } from '@theme/index';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ContactDetailHeader: React.FC<StackHeaderProps> = ({
  navigation: { goBack },
  options: { title },
}) => {
  const { top } = useSafeAreaInsets();

  const { colors } = useAppTheme();

  return (
    <View
      style={[
        styles.container,
        { paddingTop: top, backgroundColor: colors.primary['800'] },
      ]}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={goBack}
        style={styles.back}>
        <ArrowLeftIcon fill={colors.primary['50']} />
      </TouchableOpacity>
      <Text
        style={[styles.title, { color: colors.primary['50'] }]}
        numberOfLines={1}>
        {title}
      </Text>
    </View>
  );
};

export default ContactDetailHeader;
