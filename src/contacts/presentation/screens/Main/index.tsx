import React, { useEffect } from 'react';

import { useGetContactsAction } from '@contacts/presentation/redux/actions';
import { useContactsState } from '@contacts/presentation/redux/selectors';
import ContactsList from '@contacts/presentation/screens/Main/List';

const ContactsScreen: React.FC = () => {
  const getContacts = useGetContactsAction();

  useEffect(getContacts, [getContacts]);

  const state = useContactsState();

  switch (state) {
    case 'waiting':
    case 'loading':
      return <></>;
    case 'empty':
      return <></>;
    case 'success':
      return <ContactsList />;
    default:
      return <></>;
  }
};

export default ContactsScreen;
