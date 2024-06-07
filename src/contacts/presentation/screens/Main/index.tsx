import React, { useEffect } from 'react';

import ContactsSearchInput from '@contacts/presentation/components/SearchInput';
import { useGetContactsAction } from '@contacts/presentation/redux/actions';
import ContactsPage from '@contacts/presentation/screens/Main/Page';

const ContactsScreen: React.FC = () => {
  const getContacts = useGetContactsAction();

  useEffect(() => {
    getContacts({});
  }, [getContacts]);

  return (
    <>
      <ContactsSearchInput />
      <ContactsPage />
    </>
  );
};

export default ContactsScreen;
