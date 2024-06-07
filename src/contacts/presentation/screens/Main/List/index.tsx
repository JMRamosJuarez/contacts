import React, { useCallback } from 'react';

import ContactListItem from '@contacts/presentation/components/ContactListItem';
import SectionHeader from '@contacts/presentation/components/SectionHeader';
import { useContacts } from '@contacts/presentation/redux/selectors';
import Contact from '@native-modules/contacts/contact';
import ContactsGroup from '@native-modules/contacts/group';
import { SectionList, SectionListData } from 'react-native';

export const ITEM_HEIGHT = 65;
export const SECTION_HEADER_HEIGHT = 30;

const ContactsList: React.FC = () => {
  const contacts = useContacts();

  const renderSectionHeader = useCallback(
    ({
      section,
    }: {
      readonly section: SectionListData<Contact, ContactsGroup>;
    }): React.ReactElement => {
      return <SectionHeader section={section} />;
    },
    [],
  );

  const renderItem = useCallback(
    ({ item }: { readonly item: Contact }): React.ReactElement => {
      return <ContactListItem contact={item} />;
    },
    [],
  );

  return (
    <SectionList
      sections={contacts}
      stickySectionHeadersEnabled
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderSectionHeader={renderSectionHeader}
      renderItem={renderItem}
    />
  );
};

export default ContactsList;
