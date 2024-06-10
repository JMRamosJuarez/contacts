import React from 'react';

import { styles } from '@contacts/presentation/components/PhoneNumbers/Error/styles';
import { useContactsError } from '@contacts/presentation/redux/contacts/selectors';
import { useGetPhoneNumbersAction } from '@contacts/presentation/redux/details/actions';
import { AppErrorType } from '@core/domain/entities/app_error';
import { useForegroundEffect } from '@core/presentation/hooks';
import { READ_CONTACTS_PERMISSIONS } from '@native-modules/contacts';
import Contact from '@native-modules/contacts/entities/contact';
import { useAppTheme } from '@theme/index';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import { Linking } from 'react-native';
import { check as checkPermissions } from 'react-native-permissions';
import FeatherIcon from 'react-native-vector-icons/Feather';

const PhoneNumbersError: React.FC<{
  readonly contact: Contact;
}> = ({ contact }) => {
  const { colors } = useAppTheme();

  const { t } = useTranslation();

  const errors = useTranslation('errors');

  const error = useContactsError();

  const getPhoneNumbers = useGetPhoneNumbersAction();

  useForegroundEffect(
    error.type === AppErrorType.PERMISSION_DENIED,
    async () => {
      const status = await checkPermissions(READ_CONTACTS_PERMISSIONS);
      if (status === 'granted') {
        getPhoneNumbers(contact.id);
      }
    },
  );

  switch (error.type) {
    case AppErrorType.PERMISSION_DENIED:
      return (
        <View style={styles.container}>
          <FeatherIcon
            size={120}
            name={'alert-octagon'}
            color={colors.primary['50']}
            style={styles.icon}
          />
          <Text style={[{ color: colors.primary['50'] }, styles.message]}>
            {errors.t('permissions_denied')}
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.button,
              { backgroundColor: colors.secondary['500'] },
            ]}
            onPress={() => {
              Linking.openSettings();
            }}>
            <Text style={{ color: colors.primary['50'] }}>
              {t('open_settings')}
            </Text>
          </TouchableOpacity>
        </View>
      );
    default:
      return (
        <View style={styles.container}>
          <FeatherIcon
            size={65}
            name={'alert-octagon'}
            color={colors.primary['50']}
            style={styles.icon}
          />
          <Text style={[{ color: colors.primary['50'] }, styles.message]}>
            {errors.t('unknown_error')}
          </Text>
        </View>
      );
  }
};

export default PhoneNumbersError;
