import React from 'react';

import { useContactsState } from '@contacts/presentation/redux/selectors';
import ContactsList from '@contacts/presentation/screens/Main/List';

const ContactsPage: React.FC = () => {
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

export default ContactsPage;
