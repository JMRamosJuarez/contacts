import React from 'react';

import Contact from '@native-modules/contacts/contact';
import { useAppTheme } from '@theme/index';
import { Image, Text, View } from 'react-native';

const ContactListItem: React.FC<{
  readonly contact: Contact;
}> = ({ contact }) => {
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          paddingHorizontal: 24,
          paddingVertical: 12,
          marginVertical: 0.5,
        },
        { backgroundColor: colors.primary['800'] },
      ]}>
      <Image
        style={{ width: 40, height: 40, borderRadius: 40 }}
        source={
          contact.photo
            ? { uri: contact.photo }
            : require('@assets/imgs/contact-placeholder.png')
        }
        defaultSource={require('@assets/imgs/contact-placeholder.png')}
      />
      <View style={{ flex: 1, marginHorizontal: 8 }}>
        <Text style={[{ color: colors.primary['50'] }]}>{contact.name}</Text>
        {contact.phones.length > 0 && (
          <Text style={[{ color: colors.primary['50'] }]}>
            {contact.phones[0]}
          </Text>
        )}
      </View>
    </View>
  );
};

export default ContactListItem;
