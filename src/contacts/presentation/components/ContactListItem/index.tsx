import React from 'react';

import { styles } from '@contacts/presentation/components/ContactListItem/styles';
import Contact from '@native-modules/contacts/contact';
import { useAppTheme } from '@theme/index';
import { Image, Text, View } from 'react-native';

const ContactListItem: React.FC<{
  readonly contact: Contact;
}> = ({ contact }) => {
  const { colors } = useAppTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: colors.primary['800'] }]}>
      <Image
        style={styles.img}
        source={
          contact.photo
            ? { uri: contact.photo }
            : require('@assets/imgs/contact-placeholder.png')
        }
        defaultSource={require('@assets/imgs/contact-placeholder.png')}
      />
      <View style={styles.data}>
        <Text style={[styles.name, { color: colors.primary['50'] }]}>
          {contact.name}
        </Text>
        {contact.phones.length > 0 && (
          <Text style={[styles.phone, { color: colors.primary['50'] }]}>
            {contact.phones[0]}
          </Text>
        )}
      </View>
    </View>
  );
};

export default ContactListItem;
