import React from 'react';

import ContactListItem, {
  useGetItemLayout,
} from '@contacts/presentation/components/ContactListItem';
import SectionHeader from '@contacts/presentation/components/SectionHeader';
import { useContacts } from '@contacts/presentation/redux/selectors';
import { SectionList } from 'react-native';

export const ITEM_HEIGHT = 65;
export const SECTION_HEADER_HEIGHT = 30;

const ContactsList: React.FC = () => {
  const contacts = useContacts();

  const getItemLayout = useGetItemLayout();

  return (
    <SectionList
      sections={contacts}
      stickySectionHeadersEnabled
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      getItemLayout={getItemLayout}
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
