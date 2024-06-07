import React from 'react';

import ContactListItem from '@contacts/presentation/components/ContactListItem';
import SectionHeader from '@contacts/presentation/components/SectionHeader';
import { useContacts } from '@contacts/presentation/redux/selectors';
import { SectionList } from 'react-native';

const ContactsList: React.FC = () => {
  const contacts = useContacts();

  return (
    <SectionList
      sections={contacts}
      stickySectionHeadersEnabled
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderSectionHeader={({ section }) => {
        return <SectionHeader section={section} />;
      }}
      renderItem={({ item }) => {
        return <ContactListItem contact={item} />;
      }}
    />
  );
};

export default ContactsList;
