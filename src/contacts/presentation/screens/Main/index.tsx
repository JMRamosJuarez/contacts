import React, { useEffect } from 'react';

import ContactsSearchInput from '@contacts/presentation/components/SearchInput';
import { useGetContactsAction } from '@contacts/presentation/redux/actions';
import ContactsPage from '@contacts/presentation/screens/Main/Page';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ContactsScreen: React.FC = () => {
  const { top } = useSafeAreaInsets();

  const getContacts = useGetContactsAction();

  useEffect(() => {
    getContacts({});
  }, [getContacts]);

  return (
    <View style={{ paddingTop: top }}>
      <ContactsSearchInput />
      <ContactsPage />
    </View>
  );
};

export default ContactsScreen;
