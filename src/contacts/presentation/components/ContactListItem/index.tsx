import React from 'react';

import { styles } from '@contacts/presentation/components/ContactListItem/styles';
import Contact from '@native-modules/contacts/entities/contact';
import { useAppTheme } from '@theme/index';
import { Image, Text, TouchableOpacity } from 'react-native';

const ContactListItem: React.FC<{
  readonly contact: Contact;
  readonly onPress: (contact: Contact) => void;
}> = ({ contact, onPress }) => {
  const { colors } = useAppTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onPress(contact)}
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
      <Text style={[styles.name, { color: colors.primary['50'] }]}>
        {contact.name}
      </Text>
    </TouchableOpacity>
  );
};

export default ContactListItem;
