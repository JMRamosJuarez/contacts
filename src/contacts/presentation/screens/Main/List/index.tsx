import React, { useCallback } from 'react';

import ContactListItem from '@contacts/presentation/components/ContactListItem';
import PaginationItemSkeleton from '@contacts/presentation/components/PaginationItemSkeleton';
import { useGetContactsPageAction } from '@contacts/presentation/redux/contacts/actions';
import { useContacts } from '@contacts/presentation/redux/contacts/selectors';
import { styles } from '@contacts/presentation/screens/Main/List/styles';
import { useAppNavigation } from '@core/presentation/navigation/config';
import Contact from '@native-modules/contacts/entities/contact';
import { FlatList } from 'react-native';

const ContactsList: React.FC = () => {
  const { navigate } = useAppNavigation();

  const contacts = useContacts();

  const pagination = useGetContactsPageAction();

  const renderItem = useCallback(
    ({ item }: { readonly item: Contact }): React.ReactElement => {
      return (
        <ContactListItem
          contact={item}
          onPress={({ id }) => navigate('ContactDetail', { contactId: id })}
        />
      );
    },
    [navigate],
  );

  const keyExtractor = useCallback((item: Contact) => {
    return `${item.id}`;
  }, []);

  return (
    <FlatList
      style={styles.container}
      data={contacts}
      initialNumToRender={25}
      maxToRenderPerBatch={25}
      getItemLayout={(_, index) => {
        return { length: 65, offset: 65 * index, index };
      }}
      showsVerticalScrollIndicator={false}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      onEndReachedThreshold={0.25}
      onEndReached={pagination}
      ListFooterComponent={PaginationItemSkeleton}
    />
  );
};

export default ContactsList;
