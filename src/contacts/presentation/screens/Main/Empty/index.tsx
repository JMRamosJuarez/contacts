import React from 'react';

import { styles } from '@contacts/presentation/screens/Main/Empty/styles';
import { useAppTheme } from '@theme/index';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

const EmptyContacts: React.FC = () => {
  const { colors } = useAppTheme();
  const { t } = useTranslation('errors');
  return (
    <View style={styles.container}>
      <FeatherIcon
        size={120}
        name={'search'}
        color={colors.primary['50']}
        style={styles.icon}
      />
      <Text style={[{ color: colors.primary['50'] }, styles.message]}>
        {t('empty_contacts')}
      </Text>
    </View>
  );
};

export default EmptyContacts;
