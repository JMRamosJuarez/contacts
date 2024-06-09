import React from 'react';

import { styles } from '@contacts/presentation/components/ContactsHeader/styles';
import { useAppNavigation } from '@core/presentation/navigation/config';
import { StackHeaderProps } from '@react-navigation/stack';
import { useAppTheme } from '@theme/index';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FeatherIcon from 'react-native-vector-icons/Feather';

const ContactsHeader: React.FC<StackHeaderProps> = () => {
  const { top } = useSafeAreaInsets();

  const { t } = useTranslation();

  const { colors } = useAppTheme();

  const { navigate } = useAppNavigation();

  return (
    <View style={[{ marginTop: top }, styles.container]}>
      <Text style={[{ color: colors.primary['50'] }, styles.title]}>
        {t('contacts')}
      </Text>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.button}
        onPress={() => navigate('Search')}>
        <FeatherIcon size={24} name={'search'} color={colors.primary['500']} />
      </TouchableOpacity>
    </View>
  );
};

export default ContactsHeader;
