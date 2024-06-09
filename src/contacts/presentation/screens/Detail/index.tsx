import React from 'react';

import PhoneNumbers from '@contacts/presentation/components/PhoneNumbers';
import { styles } from '@contacts/presentation/screens/Detail/styles';
import { ContactDetailRouteProp } from '@core/presentation/navigation/config';
import { useRoute } from '@react-navigation/native';
import { Image, ScrollView } from 'react-native';

const ContactDetailScreen: React.FC = () => {
  const {
    params: { contact },
  } = useRoute<ContactDetailRouteProp>();

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
      <PhoneNumbers contact={contact} />
    </ScrollView>
  );
};

export default ContactDetailScreen;
