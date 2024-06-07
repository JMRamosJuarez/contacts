import React from 'react';

import ContactListItem from '@contacts/presentation/components/ContactListItem';
import { useContacts } from '@contacts/presentation/redux/selectors';
import { SectionList, Text, View } from 'react-native';

const ContactsList: React.FC = () => {
  const contacts = useContacts();

  return (
    <SectionList
      style={{ flex: 1 }}
      sections={contacts}
      stickySectionHeadersEnabled
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderSectionHeader={({ section }) => {
        return (
          <Text
            style={{
              paddingHorizontal: 24,
              paddingVertical: 6,
              backgroundColor: 'gray',
              color: 'black',
              fontWeight: 'bold',
              textAlign: 'right',
            }}>
            {section.title}
          </Text>
        );
      }}
      renderItem={({ item }) => {
        return <ContactListItem contact={item} />;
      }}
      ItemSeparatorComponent={() => (
        <View style={{ height: 1, backgroundColor: 'gray' }} />
      )}
    />
  );
};

export default ContactsList;
