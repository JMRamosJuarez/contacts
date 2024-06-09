import React, { useCallback } from 'react';

import PhoneNumberListItem from '@contacts/presentation/components/PhoneNumberListItem';
import { usePhoneNumbers } from '@contacts/presentation/redux/details/selectors/phone_numbers';
import Contact from '@native-modules/contacts/entities/contact';
import PhoneNumber from '@native-modules/contacts/entities/phone_number';
import { useTranslation } from 'react-i18next';
import { Linking } from 'react-native';
import { Alert } from 'react-native';

const PhoneNumbersList: React.FC<{
  readonly contact: Contact;
}> = ({ contact }) => {
  const { t } = useTranslation();
  const errors = useTranslation('errors');

  const phones = usePhoneNumbers(contact.id);

  const onPress = useCallback(
    async ({ account, phone }: PhoneNumber) => {
      try {
        if (account === 'com.whatsapp') {
          const whatsAppUrl = `whatsapp://send?phone=${phone}`;
          await Linking.openURL(whatsAppUrl);
        } else {
          await Linking.openURL(`tel:${phone}`);
        }
      } catch (error) {
        Alert.alert(
          errors.t('error'),
          errors.t('open_phone', { value: phone }),
          [{ text: t('accept') }],
        );
      }
    },
    [t, errors],
  );

  return (
    <>
      {phones.map(phoneNumber => {
        return (
          <PhoneNumberListItem
            key={phoneNumber.id}
            phoneNumber={phoneNumber}
            onPress={onPress}
          />
        );
      })}
    </>
  );
};

export default PhoneNumbersList;
