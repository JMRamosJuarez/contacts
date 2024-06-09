import React, { useEffect } from 'react';

import { useGetContactsAction } from '@contacts/presentation/redux/contacts/actions';
import { useContactsState } from '@contacts/presentation/redux/contacts/selectors';
import ContactsList from '@contacts/presentation/screens/Main/List';
import ContactsListSkeleton from '@contacts/presentation/screens/Main/Skeleton';

const ContactsScreen: React.FC = () => {
  const getContacts = useGetContactsAction();

  useEffect(() => {
    getContacts({ page: 0, limit: 20 });
  }, [getContacts]);

  const state = useContactsState();

  switch (state) {
    case 'waiting':
    case 'loading':
      return <ContactsListSkeleton />;
    case 'empty':
      return <></>;
    case 'success':
      return <ContactsList />;
    default:
      return <></>;
  }
};

export default ContactsScreen;
