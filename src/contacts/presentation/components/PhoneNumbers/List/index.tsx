import React from 'react';

import PhoneNumberListItem from '@contacts/presentation/components/PhoneNumberListItem';
import { usePhoneNumbers } from '@contacts/presentation/redux/details/selectors/phone_numbers';
import Contact from '@native-modules/contacts/entities/contact';
import { Linking } from 'react-native';

const PhoneNumbersList: React.FC<{
  readonly contact: Contact;
}> = ({ contact }) => {
  const phones = usePhoneNumbers(contact.id);

  return (
    <>
      {phones.map(phoneNumber => {
        return (
          <PhoneNumberListItem
            key={phoneNumber.id}
            phoneNumber={phoneNumber}
            onPress={({ phone }) => {
              Linking.openURL(`tel:${phone}`);
            }}
          />
        );
      })}
    </>
  );
};

export default PhoneNumbersList;
