import React from 'react';

import Contact from '@native-modules/contacts/contact';
import ContactsGroup from '@native-modules/contacts/group';
import { useAppTheme } from '@theme/index';
import { SectionListData, Text } from 'react-native';

const SectionHeader: React.FC<{
  readonly section: SectionListData<Contact, ContactsGroup>;
}> = ({ section }) => {
  const { colors } = useAppTheme();
  return (
    <Text
      style={[
        {
          paddingHorizontal: 24,
          paddingVertical: 6,
          fontWeight: 'bold',
          textAlign: 'right',
        },
        {
          backgroundColor: colors.primary['500'],
          color: colors.primary['900'],
        },
      ]}>
      {section.title}
    </Text>
  );
};

export default SectionHeader;
