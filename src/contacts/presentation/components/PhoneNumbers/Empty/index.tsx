import React from 'react';

import { styles } from '@contacts/presentation/components/PhoneNumbers/Empty/styles';
import { useAppTheme } from '@theme/index';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

const EmptyPhoneNumbers: React.FC = () => {
  const { colors } = useAppTheme();

  const errors = useTranslation('errors');

  return (
    <View style={styles.container}>
      <FeatherIcon
        size={65}
        name={'search'}
        color={colors.primary['50']}
        style={styles.icon}
      />
      <Text style={[{ color: colors.primary['50'] }, styles.message]}>
        {errors.t('empty_phone_numbers')}
      </Text>
    </View>
  );
};

export default EmptyPhoneNumbers;
