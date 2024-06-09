import React, { useEffect } from 'react';

import PhoneNumberListItem from '@contacts/presentation/components/PhoneNumberListItem';
import { useGetPhoneNumbersAction } from '@contacts/presentation/redux/details/actions';
import { usePhoneNumbers } from '@contacts/presentation/redux/details/selectors/phone_numbers';
import SectionHeader from '@contacts/presentation/screens/Detail/components/SectionHeader';
import { styles } from '@contacts/presentation/screens/Detail/styles';
import { ContactDetailRouteProp } from '@core/presentation/navigation/config';
import { useRoute } from '@react-navigation/native';
import { Image, Linking, ScrollView } from 'react-native';

const ContactDetailScreen: React.FC = () => {
  const {
    params: { contact },
  } = useRoute<ContactDetailRouteProp>();

  const getPhoneNumbers = useGetPhoneNumbersAction();

  useEffect(() => {
    getPhoneNumbers(contact.id);
  }, [contact.id, getPhoneNumbers]);

  const phones = usePhoneNumbers(contact.id);

  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.img}
        source={
          contact.photo
            ? { uri: contact.photo }
            : require('@assets/imgs/contact-placeholder.png')
        }
        defaultSource={require('@assets/imgs/contact-placeholder.png')}
      />
      <SectionHeader icon={'phone-call'} title={'Phone numbers'} />
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
    </ScrollView>
  );
};

export default ContactDetailScreen;
