import React from 'react';

import Contact from '@native-modules/contacts/contact';
import { Image, Text, View } from 'react-native';

const ContactListItem: React.FC<{
  readonly contact: Contact;
}> = ({ contact }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 24,
        paddingVertical: 12,
      }}>
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
        <Text>{contact.name}</Text>
        {contact.phones.map(phone => {
          return <Text key={phone}>{phone}</Text>;
        })}
      </View>
    </View>
  );
};

export default ContactListItem;
