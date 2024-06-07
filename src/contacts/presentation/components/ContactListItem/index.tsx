import React, { useCallback } from 'react';

import { styles } from '@contacts/presentation/components/ContactListItem/styles';
import Contact from '@native-modules/contacts/contact';
import ContactsGroup from '@native-modules/contacts/group';
import { useAppTheme } from '@theme/index';
import { Image, SectionListData, Text, View } from 'react-native';

export const ITEM_HEIGHT = 65;
export const SECTION_HEADER_HEIGHT = 30;

export const useGetItemLayout = () =>
  useCallback(
    (data: SectionListData<Contact, ContactsGroup>[] | null, index: number) => {
      const sectionCount = data ? data.length : 0;

      let offset = 0;

      let itemIndex = index;

      for (let i = 0; i < sectionCount; i++) {
        if (data) {
          const section = data[i];
          offset += SECTION_HEADER_HEIGHT;

          if (itemIndex < section.data.length) {
            offset += itemIndex * ITEM_HEIGHT;
            return { length: ITEM_HEIGHT, offset, index };
          }

          offset += section.data.length * ITEM_HEIGHT;
          itemIndex -= section.data.length;
        }
      }

      return { length: ITEM_HEIGHT, offset, index };
    },
    [],
  );

const ContactListItem: React.FC<{
  readonly contact: Contact;
}> = ({ contact }) => {
  const { colors } = useAppTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: colors.primary['800'] }]}>
      <Image
        style={styles.img}
        source={
          contact.photo
            ? { uri: contact.photo }
            : require('@assets/imgs/contact-placeholder.png')
        }
        defaultSource={require('@assets/imgs/contact-placeholder.png')}
      />
      <View style={styles.data}>
        <Text style={[styles.name, { color: colors.primary['50'] }]}>
          {contact.name}
        </Text>
        {contact.phones.length > 0 && (
          <Text style={[styles.phone, { color: colors.primary['50'] }]}>
            {contact.phones[0]}
          </Text>
        )}
      </View>
    </View>
  );
};

export default ContactListItem;
