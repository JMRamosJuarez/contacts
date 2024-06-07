import React, { useMemo } from 'react';

import { useGetItemLayout } from '@contacts/presentation/components/ContactListItem';
import ContactListItemSkeleton from '@contacts/presentation/components/ContactListItemSkeleton';
import SectionHeader from '@contacts/presentation/components/SectionHeader';
import { SectionList } from 'react-native';

const ContactsListSkeleton: React.FC = () => {
  const getItemLayout = useGetItemLayout();

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
      getItemLayout={getItemLayout}
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
