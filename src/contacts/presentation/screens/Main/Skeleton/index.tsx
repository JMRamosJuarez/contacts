import React, { useCallback, useMemo } from 'react';

import ContactListItemSkeleton from '@contacts/presentation/components/ContactListItemSkeleton';
import SectionHeader from '@contacts/presentation/components/SectionHeader';
import Contact from '@native-modules/contacts/contact';
import ContactsGroup from '@native-modules/contacts/group';
import { SectionList, SectionListData } from 'react-native';

const ContactsListSkeleton: React.FC = () => {
  const data = useMemo(
    () => new Array(5).fill({ title: '*', data: new Array(5).fill({}) }),
    [],
  );

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

  const renderItem = useCallback((): React.ReactElement => {
    return <ContactListItemSkeleton />;
  }, []);

  return (
    <SectionList
      sections={data}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderSectionHeader={renderSectionHeader}
      renderItem={renderItem}
    />
  );
};

export default ContactsListSkeleton;
