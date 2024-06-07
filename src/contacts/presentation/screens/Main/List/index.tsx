import React from 'react';

import { useContacts } from '@contacts/presentation/redux/selectors';
import { FlatList, Text } from 'react-native';

const ContactsList: React.FC = () => {
  const contacts = useContacts();

  return (
    <FlatList
      style={{ flex: 1 }}
      data={contacts}
      keyExtractor={item => `${item.id}`}
      renderItem={({ item }) => {
        return (
          <Text style={{ paddingHorizontal: 24, paddingVertical: 12 }}>
            {item.name}
          </Text>
        );
      }}
    />
  );
};

export default ContactsList;
