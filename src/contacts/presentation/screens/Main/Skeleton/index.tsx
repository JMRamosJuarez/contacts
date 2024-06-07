import React, { useMemo } from 'react';

import ContactListItemSkeleton from '@contacts/presentation/components/ContactListItemSkeleton';
import SectionHeader from '@contacts/presentation/components/SectionHeader';
import { SectionList } from 'react-native';

const ContactsListSkeleton: React.FC = () => {
  const data = useMemo(
    () => new Array(5).fill({ title: '*', data: new Array(5).fill({}) }),
    [],
  );

  return (
    <SectionList
      sections={data}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderSectionHeader={({ section }) => {
        return <SectionHeader section={section} />;
      }}
      renderItem={() => {
        return <ContactListItemSkeleton />;
      }}
    />
  );
};

export default ContactsListSkeleton;
